<template>
  <div class="frame-player">
    <Player/>
    <SongList/>
    <BgList v-if="currentPage === pageStatus.bgList"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Player from './Player';
import SongList from './SongList';
import BgList from './BgList';
import cPageStatus from '../common/constants';

export default {
  name: 'MP3Player',
  components: {
    Player,
    SongList,
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
  width: 375px;
  height: 768px;
  background: blue;
  position: relative;
}
@media(max-width: 812px) {
  .frame-player {
    width: 100%;
    height: 100%;
    background: green;
    position: relative;
  }
}
</style>
