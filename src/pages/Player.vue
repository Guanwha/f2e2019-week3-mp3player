<template>
  <div class="frame-player"
       v-bind:style="{ 'background-image': 'url(' + curBgUrl + ')'}">
    <div class="frame-control">
      <!-- titles -->
      <div class="area-title">
        <div class="title-main">{{curMusic.title}}</div>
        <div class="title-sub">{{curMusic.singer}}</div>
      </div>
      <!-- time bar -->
      <div class="area-timebar">
        <div class="frame-time-bar">
          <!-- time bar -->
          <div id="bar" class="area-bar">
            <div class="bar total"></div>
            <div class="bar buffer" v-bind:style="{ 'width': curBufferPercent100 + '%' }"></div>
            <div class="bar current" v-bind:style="{ 'width': curPlayPercent100 + '%' }"></div>
            <div class="current-point" v-bind:style="{ 'left': curPlayPoint + 'px' }"></div>
          </div>
          <!-- touch to control -->
          <div id="touch" class="touch"
              v-on:mousedown="startTrace($event)"
              v-on:mousemove="keepTrace($event)"
              v-on:mouseout="endTrace()"
              v-on:mouseup="endTrace()"/>
          <!-- show time -->
          <div class="area-time">
            <div class="time">{{curPlayTime}}</div>
            <div class="time total">{{curTotalTime}}</div>
          </div>
        </div>
      </div>
      <!-- control panel -->
      <div class="area-control">
        <audio id="youtube"/>
        <div v-bind:class="['btn-random', {'on': isRandom}]"/>
        <div class="btn-previous"/>
        <div v-bind:class="['btn-playpause', {'playing': isPlaying}]"
             @click="playpause"/>
        <div class="btn-next"/>
        <div v-bind:class="['btn-loop', {'repeat-one': isRepeatOne}]"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Player',
  data() {
    return {
      audioTag: null,
      isLoading: false,     // avoid to enter load() multiple times
      // time bar
      barWidth: 0,
      isDragging: false,    // flag to avoid to update 'curPlaySec' by audioTag
      curPlaySec: 0,
      curBufferSec: 0,
      curTotalSec: 0,
      // control panel
      isRandom: false,
      isRepeatOne: false,
    };
  },
  mounted() {
    this.audioTag = document.getElementById('youtube');
    // time bar
    const elBar = document.querySelector('.touch');
    this.barWidth = elBar.clientWidth;
  },
  methods: {
    // ------ time bar ------
    startTrace() {
      this.isDragging = true;
      this.calculatePercent(event);
    },
    keepTrace(event) {
      if (!this.isDragging) return;
      this.calculatePercent(event);
    },
    endTrace() {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.audioTag.currentTime = this.curPlaySec;
    },
    calculatePercent(event) {
      const x = event.offsetX;
      let percent = x / this.barWidth;
      percent = (percent <= 0.01) ? 0 : percent;
      percent = (percent > 1) ? 1 : percent;
      this.curPlaySec = parseInt(this.curTotalSec * percent, 10);
    },
    // ------ control panel ------
    playpause() {
      // check if it needs to load
      if (!this.audioTag.src) {
        this.load(this.curMusic.vid);
      }

      if (this.isPlaying) {
        // execute pause
        this.pause();             // emit to vuex
        this.audioTag.pause();
      }
      else {
        // execute play
        this.play();              // emit to vuex
        this.audioTag.play();
      }
    },
    load(vid) {
      if (!vid) return;
      if (this.isLoading) return;
      this.isLoading = true;
      const audioStreams = {};

      fetch(`https://${vid}-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=https%3A%2F%2Fwww.youtube.com%2Fget_video_info%3Fvideo_id%3D${vid}`)
        .then((response) => {
          if (response.ok) {
            response.text().then((sourceData) => {
              const data = this.parseSourceStr(sourceData);
              // console.log(data);
              const streams = (`${data.url_encoded_fmt_stream_map},${data.adaptive_fmts}`).split(',');
              // console.log(streams);

              streams.forEach((s) => {
                const stream = this.parseSourceStr(s);
                const itag = stream.itag * 1;
                let quality = false;
                // console.log(`${itag}, ${JSON.stringify(stream)}`);
                switch (itag) {
                  case 139: {
                    quality = '48kbps';
                    break;
                  }
                  case 140:
                    quality = '128kbps';
                    break;
                  case 141:
                    quality = '256kbps';
                    break;
                  default:
                    quality = false;
                }
                if (quality) audioStreams[quality] = stream.url;
              });
              // check fetch result
              if (Object.keys(audioStreams).length === 0) {
                // can't fetch this vid
                alert('cannot fetch this vid');
                this.audioTag.ontimeupdate = null;
              }
              else {
                this.audioTag.src = audioStreams['128kbps'];
                console.log(`load ${this.audioTag.src}`);

                // add listener
                this.audioTag.ontimeupdate = this.audioListener;
              }

              // update flag
              this.isLoading = false;
            });
          }
        });
    },
    parseSourceStr(str) {
      return str.split('&').reduce((params, param) => {
        const paramsM = params;
        const paramSplit = param.split('=').map(value =>
          decodeURIComponent(value.replace('+', ' ')),
        );
        paramsM[paramSplit[0]] = paramSplit[1];
        return paramsM;
      }, {});
    },
    audioListener() {
      console.log('ontimeupdate');
      // check audio loaded
      if (this.audioTag.duration) {
        if (!this.isDragging) {
          this.curPlaySec = parseInt(this.audioTag.currentTime, 10);
        }
        if (this.audioTag.buffered) {
          this.curBufferSec = this.audioTag.buffered.end(0);
        }
        this.curTotalSec = this.audioTag.duration;
      }

      // check play finished
      if (this.audioTag.ended) {
        console.log('ended');
        this.stop();
      }
    },
    ...mapActions(['play', 'pause', 'stop']),
  },
  computed: {
    // ------ time bar ------
    curPlayPoint() {
      return -7.5 + (this.barWidth * (this.curPlaySec / this.curTotalSec));
    },
    curPlayTime() {
      const min = parseInt(this.curPlaySec / 60, 10);
      const sec = parseInt(this.curPlaySec % 60, 10);
      return `${min}:${sec}`;
    },
    curPlayPercent100() {
      return (this.curPlaySec / this.curTotalSec) * 100;
    },
    curBufferPercent100() {
      return (this.curBufferSec / this.curTotalSec) * 100;
    },
    curTotalTime() {
      const min = parseInt(this.curTotalSec / 60, 10);
      const sec = parseInt(this.curTotalSec % 60, 10);
      return `${min}:${sec}`;
    },
    // ...mapGetters(['curBgUrl', 'isRandom', 'isPlaying', 'isRepeatOne', 'curMusic']),
    ...mapGetters(['curBgUrl', 'isPlaying', 'curMusic']),
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/_variables.scss';

// player frames
.frame-player {
  background: $color-bg-base;
  background-size: cover;
  background-origin: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.frame-control {
  width: 100%;
  height: 33%;
  background: linear-gradient(to bottom, #ffffff00 0%, #ffffffdd 33%, #ffffffff 100%);
}
// title area
.area-title {
  margin: 42px auto 0 auto;
  .title-main {
    font-size: 1.375rem;
    line-height: 1.75rem;
    font-weight: bold;
  }
  .title-sub {
    font-size: 1rem;
    line-height: 1.25rem;
  }
}
// time bar area
.area-timebar {
  margin: 24px 30px 0 30px;
  @import '../styles/timebar.scss';
}
// control panel area
.area-control {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.btn-random {
  width: 50px;
  height: 50px;
  background-image: url("../assets/btn_shuffle_playback.svg");
  border-width: 0;
  outline-width: 0;
  &:hover {
    transform: scale(1.2);
  }
}
.btn-previous {
  width: 50px;
  height: 50px;
  background-image: url("../assets/btn_rewind.svg");
  border-width: 0;
  outline-width: 0;
  &:hover {
    transform: scale(1.2);
  }
}
.btn-playpause {
  width: 70px;
  height: 70px;
  background-image: url("../assets/btn_play.svg");
  border-width: 0;
  outline-width: 0;
  &:hover {
    transform: scale(1.2);
  }
}
.btn-next {
  width: 50px;
  height: 50px;
  background-image: url("../assets/btn_fast.svg");
  border-width: 0;
  outline-width: 0;
  &:hover {
    transform: scale(1.2);
  }
}
.btn-loop {
  width: 50px;
  height: 50px;
  background-image: url("../assets/btn_repeat_all.svg");
  border-width: 0;
  outline-width: 0;
  &:hover {
    transform: scale(1.2);
  }
}
.playing {
  background-image: url("../assets/btn_pause.svg");
}
.repeat-one {
  background-image: url("../assets/btn_repeat_one.svg");
  filter: contrast(0%);
}
.on {
  filter: contrast(0%);
}
</style>
