<template>
  <div class="frame-player">
    <Player v-if="currentPage === pageStatus.player"/>
    <MusicList v-if="currentPage === pageStatus.musicList"/>
    <BgList v-if="currentPage === pageStatus.bgList"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Player from './Player';
import MusicList from './MusicList';
import BgList from './BgList';
import cPageStatus from '../common/constants';

export default {
  name: 'MP3Player',
  components: {
    Player,
    MusicList,
    BgList,
  },
  data() {
    return {
      pageStatus: cPageStatus,
    };
  },
  computed: {
    ...mapGetters(['currentPage']),
  },
};
</script>

<style lang="scss" scoped>
.frame-player {
  width: 432px;
  height: 768px;
  background: blue;
}
@media(max-width: 812px) {
  .frame-player {
    width: 100%;
    height: 100%;
    background: green;
  }
}
</style>
