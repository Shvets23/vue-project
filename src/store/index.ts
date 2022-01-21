import {createStore} from 'vuex';
import tasksStore from './modules/tasks';
import activitiesStore from './modules/activities';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    tasks: tasksStore,
    activities: activitiesStore,
  },
});
