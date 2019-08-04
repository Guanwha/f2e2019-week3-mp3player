
import * as types from './mutation_types';
import pageStatus from '../common/constants';


// mutations
export const mutations = {
  // payload is pageStatus (0 ~ 2)
  [types.CHANGE_PAGE](state, payload) {
    if (payload >= pageStatus.player && payload <= pageStatus.bgList) {
      state.pageStatus = payload;
    }
  },
  // play & pause & stop
  [types.PLAY](state) {
    state.isPlaying = true;
  },
  [types.PAUSE](state) {
    state.isPlaying = false;
  },
  [types.STOP](state) {
    state.isPlaying = false;
  },
  // switch song
  [types.PREV_SONG](state) {
    const idx = state.curSongIdx - 1;
    console.log(`select ${idx}th song.`);
    state.curSongIdx = (idx < 0) ? state.songList.length - 1 : idx;
  },
  [types.NEXT_SONG](state) {
    const idx = state.curSongIdx + 1;
    console.log(`select ${idx}th song.`);
    state.curSongIdx = (idx > state.songList.length - 1) ? 0 : idx;
  },
  [types.RANDOM_SONG](state) {
    const n = state.songList.length;
    let idx = Math.floor(Math.random() * n);
    while (idx === state.curSongIdx) {
      idx = Math.floor(Math.random() * n);
    }
    console.log(`select ${idx}th song.`);
    state.curSongIdx = idx;
  },
  // payload is the song's vid
  [types.SELECT_SONG](state, payload) {
    let i;
    for (i = 0; i < state.songList.length; i++) {
      if (state.songList[i].vid === payload) {
        state.curSongIdx = i;
        break;
      }
    }
  },
  // swith page
  [types.PLAYER_TO_LIST](state) {
    if (state.curPage === pageStatus.player) {
      state.curPage = pageStatus.songList;
    }
  },
  [types.LIST_TO_PLAYER](state) {
    if (state.curPage === pageStatus.songList) {
      state.curPage = pageStatus.player;
    }
  },
};

// state
export const state = {
  curPage: pageStatus.player,
  curBgIdx: 0,
  bgUrls: ['https://upload.cc/i1/2019/07/23/8C9Evy.png', 'https://upload.cc/i1/2019/07/23/mZdA12.png'],

  isPlaying: false,
  curSongIdx: 0,
  songList: [{
    vid: 'j3tt5C-eXro',
    title: 'The Bluest Star',
    singer: 'The 126ers',
  }, {
    vid: 'ojBHz6i9Lkc',
    title: 'Underdog',
    singer: 'The 126ers',
  }, {
    vid: 'Q9Wdexi-vP8',
    title: 'End of Summer',
    singer: 'The 126ers',
  }, {
    vid: 'o7rulFKDi8I',
    title: 'Malmo Sunrise',
    singer: 'The 126ers',
  }, {
    vid: 'OrydPDIFTK0',
    title: 'Every Step',
    singer: 'Silent Partner',
  }, {
    vid: 'Q17GbypwqVs',
    title: 'Desert Sky',
    singer: 'Silent Partner',
  // }, {
  //   vid: '5LhKG8ucAF8',
  //   title: '當你孤單你會想起誰',
  //   singer: '張棟樑',
  // }, {
  //   vid: 'xcwHJ3ac3rs',
  //   title: '終於等到你',
  //   singer: '張靚穎',
  }],
};
