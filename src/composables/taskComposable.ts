import {computed, ref} from 'vue';
import {useStore} from 'vuex';
import {TaskInterface} from '@/types/task.interface';

export default function taskActions() {
  let tasks = computed(() => store.state.tasks.tasksList);
  const store = useStore();

  const getTask = () => {
    store.dispatch('tasks/getTasks').then((res: any) => {});
  };
  const deleteTask = (id: number) => {
    store.dispatch('tasks/removeTask', id).then(() => {
      getTask();
    });
  };
  const updateTask = (task: TaskInterface) => {
    store.dispatch('tasks/updateTask', task).then(() => {
      getTask();
    });
  };
  const createTask = (task: TaskInterface) => {
    store.dispatch('tasks/createTask', task).then(() => {
      getTask();
    });
  };
  return {
    tasks,
    getTask,
    deleteTask,
    updateTask,
    createTask,
  };
}
