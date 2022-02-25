import {createStore} from 'vuex';
import tasksStore from './modules/tasks';
import activitiesStore from './modules/activities';
import usersStore from '@/store/modules/users';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    tasks: tasksStore,
    activities: activitiesStore,
    users: usersStore,
  },
});
