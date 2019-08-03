<template>
  <div v-bind:class="[(showAll) ? 'frame-show' : 'frame-hide' ]"
       v-bind:style="{ 'background-image': 'url(' + curBgUrl + ')'}">
    <div v-show="showAll" class="frame-list">
      <div class="list-upper">
        <div class="title">SONG LIST</div>
        <div class="btn-back" @click.prevent="closeSongList()"/>
      </div>
      <div class="list">
        <div v-for="song in songs"
             v-bind:key="song.vid">
          <div class="song">{{song.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import cPageStatus from '../common/constants';

export default {
  name: 'SongList',
  data() {
    return {
      pageStatus: cPageStatus,
    };
  },
  methods: {
    ...mapActions(['closeSongList']),
  },
  computed: {
    showAll() {
      return this.currentPage === this.pageStatus.songList;
    },
    ...mapGetters(['currentPage', 'curBgUrl', 'songs', 'curSong']),
  }
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
  background: green;
  transition: $open-speed;
}
.frame-show {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  background: darkgoldenrod;
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
    position: absolute;
    left: 11px;
    top: 0;
    &:hover {
      transform: scale(1.5);
    }
  }
}
// lower list
.list {
  width: 85%;
  height: 100%;
  margin: 0 auto 0 auto;
  padding-top: 61px;
  background: darkolivegreen;
}
.song {
  height: 70px;
}
</style>
