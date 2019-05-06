/* eslint-disable linebreak-style */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import firebase from 'firebase';
import router from '@/router';
import { SET_USER, SET_IS_AUTHENTICATED, SET_USER_RECIPES } from '../mutation-types';

const state = {
  user: null,
  isAuthenticated: false,
  userRecipes: [],
  recipes: [],
};

const getters = {
  getIsAuthenticated: state => state.user !== null && state.user !== undefined,
  getUserRecipes: state => state.userRecipes,
};

const mutations = {
  [SET_USER](state, payload) {
    state.user = payload;
  },
  [SET_IS_AUTHENTICATED](state, payload) {
    state.isAuthenticated = payload;
  },
  [SET_USER_RECIPES](state, payload) {
    state.userRecipes = payload;
  },
};

const actions = {
  userJoin({ commit }, { email, password }) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        commit('SET_USER', user);
        commit('SET_IS_AUTHENTICATED', true);
        router.push('/about');
      })
      .catch(() => {
        commit('SET_USER', null);
        commit('SET_IS_AUTHENTICATED', false);
      });
  },
  userLogin({ commit }, { email, password }) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        commit('SET_USER', user);
        commit('SET_IS_AUTHENTICATED', true);
        router.push('/about');
      })
      .catch(() => {
        commit('SET_USER', null);
        commit('SET_IS_AUTHENTICATED', false);
      });
  },
  userSignOut({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit('SET_USER', null);
        commit('SET_IS_AUTHENTICATED', false);
        router.push('/');
      })
      .catch(() => {
        commit('SET_USER', null);
        commit('SET_IS_AUTHENTICATED', false);
        router.push('/');
      });
  },
  userRecipes({ state, commit }) {
    return firebase
      .database()
      .ref(`users/${state.user.user.uid}`)
      .once('value', (snapshot) => {
        commit('SET_USER_RECIPES', snapshot.val());
      });
  },
  addRecipe(payload) {
    firebase
      .database()
      .ref('users')
      .child(state.user.user.uid)
      .push(payload.recipe.label);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
