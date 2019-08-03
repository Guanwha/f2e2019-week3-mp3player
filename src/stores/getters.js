
const getters = {
  // app control
  currentPage: state => state.curPage,
  curBgUrl: state => state.bgUrls[state.curBgIdx],
  // song info
  isPlaying: state => state.isPlaying,
  curSong: state => state.songList[state.curSongIdx],
  songs: state => state.songList,
};

export default getters;
