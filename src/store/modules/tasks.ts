import TaskStatus from '@/core/enums/task-status.enum';
import {TaskInterface} from '@/types/task.interface';
import {TasksStoreInterface} from '@/types/store/taska-store.interface';

const tasksStore = {
  namespaced: true,
  state: {
    tasksList: [
      {
        title: 'Add Reference',
        description: 'All references should open in a new tab in browser. To view the reference, click on the eye',
        dateTo: '2022-01-10T18:51:33.659Z',
        status: TaskStatus.TO_DO,
        id: 1,
      },
      {
        title: 'Add Video',
        description: 'All references should open in a new tab in browser. To view the reference, click on the eye',
        dateTo: '2021-11-14T21:39:54.159Z',
        status: TaskStatus.TO_DO,
        id: 2,
      },
      {
        title: 'Shared session',
        description:
          'This is the tab that relates to whether the session is shared (this is a sorting option for sessions',
        dateTo: '2021-08-23T21:39:54.159Z',
        status: TaskStatus.IN_PROGRESS,
        id: 3,
      },
      {
        title: 'Private session',
        description:
          'This is the tab that relates to whether the session is shared (this is a sorting option for sessions)',
        dateTo: '2021-05-07T21:39:54.159Z',
        status: TaskStatus.IN_PROGRESS,
        id: 33,
      },
      {
        title: 'Wait for start',
        description: 'When the session has NOT been started yet, the user wont be allowed entering the system',
        dateTo: '2021-05-07T21:39:54.159Z',
        status: TaskStatus.DONE,
        id: 4,
      },
    ] as TaskInterface[],
  },
  getters: {
    getTasks(state: TasksStoreInterface): TaskInterface[] {
      return state.tasksList;
    },
  },
  mutations: {
    addTask(state: TasksStoreInterface, payload: TaskInterface) {
      state.tasksList.push(payload);
    },
  },
  actions: {},
};

export default tasksStore;
