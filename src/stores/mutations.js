
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
    let idx = state.curMusicIdx - 1;
    state.curMusicIdx = (idx < 0) ? state.musicList.length - 1 : idx;
  },
  [types.NEXT_SONG](state) {
    let idx = state.curMusicIdx + 1;
    state.curMusicIdx = (idx > state.musicList.length - 1) ? 0 : idx;
  }
};

// state
export const state = {
  curPage: pageStatus.player,
  curBgIdx: 0,
  bgUrls: ['https://upload.cc/i1/2019/07/23/8C9Evy.png', 'https://upload.cc/i1/2019/07/23/mZdA12.png'],

  isPlaying: false,
  curMusicIdx: 0,
  musicList: [{
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
  }, {
    vid: '5LhKG8ucAF8',
    title: '當你孤單你會想起誰',
    singer: '張棟樑',
  }, {
    vid: 'xcwHJ3ac3rs',
    title: '終於等到你',
    singer: '張靚穎',
  }],
};
