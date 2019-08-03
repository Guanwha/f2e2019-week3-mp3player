
const getters = {
  // app control
  currentPage: state => state.curPage,
  curBgUrl: state => state.bgUrls[state.curBgIdx],
  // audio info
  isPlaying: state => state.isPlaying,
  curMusic: state => state.musicList[state.curMusicIdx],
};

export default getters;
