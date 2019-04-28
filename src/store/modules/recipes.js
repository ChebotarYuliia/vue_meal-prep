/* eslint-disable linebreak-style */
import recipesRequest from '../../api';
// initial state
const state = {
  recipes: [],
  apiUrl: 'https://api.edamam.com/search',
};

const getters = {
  getRecipes(state) {
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
