import {ref} from 'vue';
import TaskStatus from '@/core/enums/task-status.enum';

export default function openTaskModal() {
  let defaultTask = {
    title: '',
    description: '',
    createdAt: '',
    dateTo: '',
    status: TaskStatus.TO_DO,
    id: '',
  };
  let isOpenModal = ref(false);
  let activeTask = ref(defaultTask);
  const openModal = (task: any) => {
    activeTask.value = task;
    isOpenModal.value = true;
  };
  const onTaskChange = () => {
    isOpenModal.value = false;
    activeTask.value = defaultTask;
  };
  return {
    defaultTask,
    isOpenModal,
    activeTask,
    openModal,
    onTaskChange,
  };
}
