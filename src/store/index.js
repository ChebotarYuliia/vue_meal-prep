/* eslint-disable linebreak-style */
import Vue from 'vue';
import Vuex from 'vuex';
import recipes from './modules/recipes';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    recipes,
    user,
  },
});
