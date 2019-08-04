<template>
  <div v-bind:class="[ (pIsShow) ? 'frame-dialog-show' : 'frame-dialog-hide']"
       @click.self="$emit('close')">
    <div v-if="pIsShow" class="backboard">
      <div class="area-info">
        <div class="title">Youtube URL/vid：(<a href="https://www.youtube.com/channel/UCorqI2EE1avwlTCekjfi0LQ" target="_blank">免費音樂</a>)</div>
        <input class="field" v-model="youtube" placeholder="Please enter youtube url or vid">
      </div>
      <div class="area-info">
        <div class="title">Song：</div>
        <input class="field" v-model="title" placeholder="Please enter song title (Option)">
      </div>
      <div class="area-info">
        <div class="title">Singer：</div>
        <input class="field" v-model="singer" placeholder="Please enter singer (Option)">
      </div>
      <div class="area-btns">
        <div v-bind:class="['btn', {'is-danger': !pIsNew}]"
             @click="cancelDelete()"
        >
          {{(pIsNew ? 'Cancel' : 'Delete')}}
        </div>
        <div class="btn"
             @click="createConfirm()"
        >
          {{(pIsNew ? 'Create' : 'Confirm')}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'DialogSong',
  props: {
    pIsShow: Boolean,
    pIsNew: Boolean,
    pSong: Object,
  },
  data() {
    return {
      youtube: '',        // youtube url or vid
      title: '',          // song title
      singer: '',         // singer name
    };
  },
  watch: {
    pSong: {
      handler(newSong) {
        if (newSong) {
          this.youtube = newSong.vid;
          this.title = newSong.title;
          this.singer = newSong.singer;
        }
        else {
          this.youtube = '';
          this.title = '';
          this.singer = '';
        }
      },
      deep: true,
    },
  },
  methods: {
    cancelDelete() {
      if (this.pIsNew) {
        this.$emit('close');
      }
      else {
        // emit to vuex deleteSong
        this.deleteSong(this.youtube);
        this.$emit('close');
      }
    },
    createConfirm() {
      // [TODO] check youtube url / vid
      const vid = this.checkYoutubeURL(this.youtube);
      if (!vid || vid.length !== 11) {
        alert('cannot find the video id');
        return;
      }
      console.log(`vid: ${vid}`);

      if (this.pIsNew) {
        // [TODO] emit to vuex addSong
        this.createSong({
          vid,
          title: this.title,
          singer: this.singer,
        });
        this.$emit('close');
      }
      else {
        // [TODO] emit to vuex updateSong
        const payload = {
          vid: this.pSong.vid,
          updatedSong: {
            vid,
            title: this.title,
            singer: this.singer,
          },
        };
        this.updateSong(payload);
        this.$emit('close');
      }
    },
    checkYoutubeURL(str) {
      // check vid
      if (str.length === 11) {
        return str;
      }

      // check https://www.youtube.com/watch?v=xxxxxxxxxxx&list=yyyyyyyyyyyyyyyyyyyyyyyyyy&index=nn
      let urlData = str.split('?').map(value => value);
      if (urlData[1]) {
        const dataMap = urlData[1].split('&').reduce((params, param) => {
          const paramsM = params;
          const paramSplit = param.split('=').map(value =>
            decodeURIComponent(value.replace('+', ' ')),
          );
          paramsM[paramSplit[0]] = paramSplit[1];
          return paramsM;
        }, {});
        if (dataMap.v) {
          return dataMap.v;
        }
      }

      // check https://youtu.be/xxxxxxxxxxx
      urlData = str.split('https://youtu.be/').map(value => value);
      if (urlData[1]) {
        return urlData[1];
      }
      return '';
    },
    ...mapActions(['createSong', 'updateSong', 'deleteSong']),
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/_variables.scss';
$color-dlg-bg: #00000099;
$outer-border-radius: 10px;
$inner-border-radius: 7px;
$color-main: hsl(0, 3%, 25%);

.frame-dialog-hide {
  width: 0;
  height: 0;
  background: #00000000;
  position: fixed;
  right: 33px;
  top: 66px;
  transition: 0.2s;
}
.frame-dialog-show {
  width: 100%;
  height: 100%;
  background: #00000099;
  position: fixed;
  right: 0;
  top: 0;
  transition: 0.2s;

  display: flex;
  justify-content: center;
  align-items: center;
}
.backboard {
  width: 80%;
  height: auto;
  background: hsla(0, 3%, 95%, 0.8);
  border: 5px solid $color-main;
  border-radius: $outer-border-radius;
  padding: 50px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.area-info {
  width: 100%;
  height: 6rem;
  margin-top: 1.2rem;
  padding: 0.7rem 1.5rem;
  background: hsl(0, 3%, 80%);
  border: 1px solid hsl(0, 3%, 50%);
  border-radius: $inner-border-radius;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  .title {
    color: $color-main;
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1.5rem;
  }
  .field {
    width: 100%;
    padding: 0 5px;
    color: $color-main;
    font-size: 1.2rem;
    line-height: 1.2rem;
    outline-width: 0;
  }
}
.area-btns {
  width: 100%;
  margin-top: 3rem;
  padding: 0.7rem 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .btn {
    width: 30%;
    height: 2rem;
    border-radius: $inner-border-radius;
    color: $color-main;
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      transform: scale(1.2);
      filter: drop-shadow(0 0 10px hsl(0, 3%, 25%));
    }
  }
  .is-danger {
    color: hsl(336, 100%, 50%);
    &:hover {
      filter: drop-shadow(0 0 10px hsl(336, 100%, 50%));
    }
  }
}
</style>

