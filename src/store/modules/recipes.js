/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import firebase from 'firebase';
import { recipesRequest } from '../../api';
import { SET_RECIPES } from '../mutation-types';

// initial state
const state = {
  recipes: [],
  apiUrl: 'https://api.edamam.com/search',
};

const getters = {
  getRecipes() {
    return state.recipes;
  },
};

const mutations = {
  [SET_RECIPES](state, payload) {
    state.recipes = payload;
  },
};

const actions = {
  queryRecipes({ commit }, plan) {
    recipesRequest(`${state.apiUrl}`, plan).then((response) => {
      commit('SET_RECIPES', response);
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
