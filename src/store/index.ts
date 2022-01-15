import Vue from 'vue';
import Vuex from 'vuex';
import tasksStore from '@/store/modules/tasks';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    tasks: tasksStore,
  },
});
