
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
  // switch song
  prevSong: ({ commit }) => {
    commit(types.PREV_SONG);
  },
  nextSong: ({ commit }) => {
    commit(types.NEXT_SONG);
  },
  randomAnySong: ({ commit }) => {
    commit(types.RANDOM_SONG);
  },
  selectSong: ({ commit }, payload) => {
    commit(types.SELECT_SONG, payload);
  },
  // create / delete song
  createSong: ({ commit }, payload) => {
    commit(types.CREATE_SONG, payload);
  },
  deleteSong: ({ commit }, payload) => {
    commit(types.DELETE_SONG, payload);
  },
  // swith from Player to SongList
  openSongList: ({ commit }) => {
    commit(types.PLAYER_TO_LIST);
  },
  closeSongList: ({ commit }) => {
    commit(types.LIST_TO_PLAYER);
  },
};

export default actions;
