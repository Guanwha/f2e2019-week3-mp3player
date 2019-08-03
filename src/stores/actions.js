
import * as types from './mutation_types';

const actions = {
  changePage: ({ commit }, payload) => {
    commit(types.CHANGE_PAGE, payload);
  },
  play: ({ commit }) => {
    commit(types.PLAY);
  },
  pause: ({ commit }) => {
    commit(types.PAUSE);
  },
  stop: ({ commit }) => {
    commit(types.STOP);
  },
};

export default actions;
