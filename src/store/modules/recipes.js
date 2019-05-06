/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import { recipesRequest } from '../../api';
import { SET_RECIPES } from '../mutation-types';

// initial state
const state = {
  apiUrl: 'https://api.edamam.com/search',
};

const getters = {
  getRecipes: state => state.recipes,
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
