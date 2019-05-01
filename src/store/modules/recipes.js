/* eslint-disable linebreak-style */
import firebase from 'firebase';
import { recipesRequest } from '../../api';
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
  setRecipes(state, payload) {
    state.recipes = payload;
  },
};

const actions = {
  queryRecipes({ commit }, plan) {
    recipesRequest(`${state.apiUrl}`, plan).then((response) => {
      commit('setRecipes', response);
    });
  },
  addRecipe({ state }, payload) {
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
