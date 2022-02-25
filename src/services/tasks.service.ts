import ApiService from '@/services/helper/api.service';
import {TaskInterface} from '@/types/task.interface';

export default class TasksService {
  static createTask(task: TaskInterface) {
    return ApiService.post('/tasks', task);
  }

  static updateTask(task: TaskInterface) {
    return ApiService.put(`/tasks/${task.id}`, task);
  }

  static getTasks() {
    return ApiService.get('/tasks');
  }
  static deleteTask(id: number) {
    return ApiService.delete(`/tasks/${id}`);
  }
}
