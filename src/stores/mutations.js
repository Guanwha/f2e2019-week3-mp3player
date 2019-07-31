
import * as types from './mutation_types';
import pageStatus from '../common/constants';


// mutations
export const mutations = {
  [types.CHANGE_PAGE](state, payload) {
    if (payload >= pageStatus.player && payload <= pageStatus.bgList) {
      state.pageStatus = payload;
    }
  },
};

// state
export const state = {
  curPage: pageStatus.player,
};
