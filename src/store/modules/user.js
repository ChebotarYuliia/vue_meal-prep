/* eslint-disable linebreak-style */
import userJoinAuth from '../../api';

const state = {
  user: null,
  isAuthenticated: false,
};

const getters = {};

const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  setIsAuthenticated(state, payload) {
    state.isAuthenticated = payload;
  },
};

const actions = {
  userJoin({ commit }, { email, password }) {
    console.log(email);
    const a = userJoinAuth(email, password);
    console.log(a);
    commit('setIsAuthenticated', true);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

// .then((response) => {
//       commit('setUser', response.user);
//       commit('setIsAuthenticated', response.authenticated);
//     }),
