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
        createdAt: '2022-01-10T18:51:33.659Z',
        status: TaskStatus.TO_DO,
        id: 1,
      },
      {
        title: 'Add Video',
        description: 'All references should open in a new tab in browser. To view the reference, click on the eye',
        dateTo: '2022-01-14T21:39:54.159Z',
        createdAt: '2022-01-11T18:51:33.659Z',
        status: TaskStatus.TO_DO,
        id: 2,
      },
      {
        title: 'Shared session',
        description:
          'This is the tab that relates to whether the session is shared (this is a sorting option for sessions',
        dateTo: '2022-01-23T21:39:54.159Z',
        createdAt: '2022-01-12T18:51:33.659Z',
        status: TaskStatus.IN_PROGRESS,
        id: 3,
      },
      {
        title: 'Private session',
        description:
          'This is the tab that relates to whether the session is shared (this is a sorting option for sessions)',
        dateTo: '2022-01-07T21:39:54.159Z',
        createdAt: '2022-01-13T18:51:33.659Z',
        status: TaskStatus.IN_PROGRESS,
        id: 33,
      },
      {
        title: 'Wait for start',
        description: 'When the session has NOT been started yet, the user wont be allowed entering the system',
        createdAt: '2022-01-15T18:51:33.659Z',
        dateTo: '2022-01-17T21:39:54.159Z',
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
    updateTask(state: TasksStoreInterface, task: TaskInterface): void {
      state.tasksList.forEach((stateTask, i): void => {
        if (stateTask.id === task.id) {
          stateTask.title = task.title;
          stateTask.description = task.description;
          stateTask.status = task.status;
        }
      });
    },
    removeTask(state: TasksStoreInterface, id: number) {
      state.tasksList.forEach((stateTask, i): void => {
        if (stateTask.id === id) {
          state.tasksList.splice(i, 1);
        }
      });
    },
  },
  actions: {},
};

export default tasksStore;
