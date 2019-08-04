
const getters = {
  // app control
  currentPage: state => state.curPage,
  curBgUrl: state => state.bgUrls[state.curBgIdx],
  // song info
  isPlaying: state => state.isPlaying,
  curSong: state => {
    if (state.curSongIdx >= 0 && state.curSongIdx < state.songList.length) {
      return state.songList[state.curSongIdx];
    }
    else {
      return { vid:'', title:'Click here to select song', singer:'_' };
    }
  },
  songs: state => state.songList,
};

export default getters;
