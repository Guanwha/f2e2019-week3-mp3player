
const getters = {
  // app control
  currentPage: state => state.curPage,
  curBgUrl: state => state.bgUrls[state.curBgIdx],
  // audio info
  isPlaying: state => state.isPlaying,
  curSong: state => state.songList[state.curSongIdx],
};

export default getters;
