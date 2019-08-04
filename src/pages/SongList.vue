<template>
  <div v-bind:class="[(showAll) ? 'frame-show' : 'frame-hide' ]"
       v-bind:style="{ 'background-image': 'url(' + curBgUrl + ')'}">
    <div v-show="showAll" class="frame-list">
      <div class="list-upper">
        <div class="title">SONG LIST</div>
        <div class="btn-back" @click="closeSongList()"/>
        <div class="btn-add" @click="openDialogAddSong(true, null)"/>
      </div>
      <RecycleScroller class="list"
                        :items="songs"
                        :item-size="70"
                        key-field="vid"
                        v-slot="{ item }">
        <div class="song-outer" @click="openDialogAddSong(false, item)">
          <div class="song-inner">
            <div class="song-info">
              <div class="song-title">{{item.title}}</div>
              <div class="song-singer">{{item.singer}}</div>
            </div>
            <div v-bind:class="['song-btn',
                                (((item.vid === curSong.vid) && isPlaying) ? 'pause' : 'play')]"
                 @click.stop="playpause(item)">
            </div>
          </div>
        </div>
      </RecycleScroller>
    </div>
    <DialogSong v-bind:pIsShow="showDialog"
                v-bind:pIsNew="isCreateSong"
                v-bind:pSong="editingSong"
                @close="closeDialogAddSong"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import cPageStatus from '../common/constants';
import DialogSong from '../components/DialogSong';

export default {
  name: 'SongList',
  components: {
    DialogSong,
  },
  data() {
    return {
      pageStatus: cPageStatus,
      isCreateSong: false,
      isEditSong: false,
      editingSong: null,
    };
  },
  methods: {
    playpause(song) {
      if (song.vid === this.curSong.vid) {
        if (this.isPlaying) {
          this.pause();     // switch to pause
        }
        else {
          this.play();      // switch to play
        }
      }
      else {
        // switch song
        this.selectSong(song.vid);
      }
    },
    openDialogAddSong(isCreate, song) {
      this.isEditSong = true;
      this.isCreateSong = isCreate;
      this.editingSong = song;
    },
    closeDialogAddSong() {
      console.log('close');
      this.isEditSong = false;
      this.isCreateSong = false;
    },
    ...mapActions(['closeSongList', 'play', 'pause', 'selectSong']),
  },
  computed: {
    showAll() {
      return this.currentPage === this.pageStatus.songList;
    },
    showDialog() {
      return this.showAll && (this.isCreateSong || this.isEditSong);
    },
    ...mapGetters(['currentPage', 'curBgUrl', 'isPlaying', 'songs', 'curSong']),
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/_variables.scss';
$open-speed: 0.3s;

.frame-hide {
  width: 100%;
  height: 0;
  position: absolute;
  left: 0;
  bottom: 24%;
  background: darkgoldenrod;
  background-size: cover;
  transition: $open-speed;
}
.frame-show {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  background: darkgoldenrod;
  background-size: cover;
  padding-top: 44px;
  transition: $open-speed;
}
.frame-list {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #ffffff00 0%, #ffffffdd 23%, #ffffffee 100%);
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
// upper tool bar
.list-upper {
  position: relative;
  .title {
    font-size: 1.75rem;
    font-weight: bold;
    color: $color-gray;
    line-height: 44px;
    text-shadow: $color-white 0 0 0.3rem;
  }
  .btn-back {
    width: 44px;
    height: 44px;
    background-image: url('../assets/btn_back.svg');
    filter: invert(100%) drop-shadow(0 0 2px $color-white);
    transform: rotateZ(-90deg);
    position: absolute;
    left: 11px;
    top: 0;
    &:hover {
      transform: rotateZ(-90deg) scale(1.5);
    }
  }
  .btn-add {
    width: 44px;
    height: 44px;
    background-image: url('../assets/btn_plus.png');
    background-position: center center;
    filter: drop-shadow(0 0 2px $color-white);
    position: absolute;
    right: 11px;
    top: 0;
    &:hover {
      transform: scale(1.5);
    }
  }
}
// lower list
.list {
  width: 100%;
  height: 100%;
  margin: 0 auto 0 auto;
  padding-top: 61px;
}
.song-outer {
  height: 70px;
  &:hover {
    box-shadow: 0 0 20px $color-gray;
  }
}
.song-inner {
  width: 85%;
  height: 100%;
  margin: 0 auto;
  border-bottom: 1px solid $color-sub;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .song-info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
  }
  .song-title {
    color: $color-main;
    font-size: 18pt;
    line-height: 23px;
    font-weight: bold;
  }
  .song-singer {
    color: $color-main;
    font-size: 14pt;
    line-height: 18px;
    margin-top: 10px;
  }
  .song-btn {
    width: 50px;
    height: 50px;
    &:hover {
      transform: scale(1.5);
    }
  }
  .play {
    background-image: url('../assets/btn_play_small.svg');
  }
  .pause {
    background-image: url('../assets/btn_pause_small.svg');
  }
}

// Hidden scroll bar
/* width */
::-webkit-scrollbar {
  width: 0px;
}
</style>
