import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);

import task from "./modules/task.js";

export default new Vuex.Store({
  modules: {
    task,
  },
  state: {
    loading: false,
  },
  getters: {
    _stateLoading(state) {
      return state.loading;
    },
  },
  mutations: {
    _loadingState(state) {
      state.loading = !state.loading;
    },
  },
});
