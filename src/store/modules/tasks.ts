import TaskStatus from '@/core/enums/task-status.enum';
import {TaskInterface} from '@/types/task.interface';
import {TasksStoreInterface} from '@/types/store/taska-store.interface';
import TasksService from '@/services/tasks.service';

const tasksStore = {
  namespaced: true,
  state: {
    tasksList: [] as TaskInterface[],
  },
  getters: {
    getTasks(state: TasksStoreInterface): TaskInterface[] {
      return state.tasksList;
    },
  },
  mutations: {
    setTasks(state: TasksStoreInterface, data: TaskInterface[]) {
      state.tasksList = data;
    },
  },
  actions: {
    getTasks({commit}: any) {
      return TasksService.getTasks().then((response: any) => {
        commit('setTasks', response.data);
      });
    },
    removeTask({commit}: any, id: number) {
      return TasksService.deleteTask(id).then((response: any) => {});
    },
    updateTask({commit}: any, payload: any) {
      return TasksService.updateTask(payload).then((response: any) => {});
    },
    createTask({commit}: any, payload: any) {
      return TasksService.createTask(payload).then((response: any) => {});
    },
  },
};

export default tasksStore;
