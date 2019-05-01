/* eslint-disable linebreak-style */
import firebase from 'firebase';
// import { userJoinAuth } from '../../api';
import router from '@/router';

const state = {
  user: null,
  isAuthenticated: false,
  userRecipes: [],
};

const getters = {
  getIsAuthenticated(state) {
    return state.user !== null && state.user !== undefined;
  },
  getUserRecipes(state) {
    return state.userRecipes;
  },
};

const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  setIsAuthenticated(state, payload) {
    state.isAuthenticated = payload;
  },
  setUserRecipes(state, payload) {
    state.userRecipes = payload;
  },
};

const actions = {
  userJoin({ commit }, { email, password }) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        commit('setUser', user);
        commit('setIsAuthenticated', true);
        router.push('/about');
      })
      .catch(() => {
        commit('setUser', null);
        commit('setIsAuthenticated', false);
      });
  },
  userLogin({ commit }, { email, password }) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        commit('setUser', user);
        commit('setIsAuthenticated', true);
        router.push('/about');
      })
      .catch(() => {
        commit('setUser', null);
        commit('setIsAuthenticated', false);
      });
  },
  userSignOut({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit('setUser', null);
        commit('setIsAuthenticated', false);
        router.push('/');
      })
      .catch(() => {
        commit('setUser', null);
        commit('setIsAuthenticated', false);
        router.push('/');
      });
  },
  getUserRecipes({ state, commit }) {
    return firebase
      .database()
      .ref(`users/${state.user.user.uid}`)
      .once('value', (snapshot) => {
        commit('setUserRecipes', snapshot.val());
      });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
