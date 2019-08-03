
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
  prevSong: ({ commit }) => {
    commit(types.PREV_SONG);
  },
  nextSong: ({ commit }) => {
    commit(types.NEXT_SONG);
  },
  randomAnySong: ({ commit }) => {
    commit(types.RANDOM_SONG);
  },
};

export default actions;
