<template lang="pug">
.tab-item.active-item
  .tab-title Kanban
  .container
    .tasks-column.to-do
      .tasks-column__title To Do
      draggable.kanban-column(:list='tasksToDo' group='tasks')
        task-card(v-for='(task, index) in tasksToDo' :key='index' :task='task' @onTaskChanged='updateTask($event, "tasksToDo")')
    .tasks-column.in-progress
      .tasks-column__title In Progress
      draggable.kanban-column(:list='tasksInProgress' group='tasks')
        task-card(v-for='(task, index) in tasksInProgress' :key='index' :task='task'  @onTaskChanged='updateTask($event, "tasksInProgress")')
    .tasks-column.done
      .tasks-column__title Done
      draggable.kanban-column(:list='tasksDone' group='tasks')
        task-card(v-for='(task, index) in tasksDone' :key='index' :task='task'  @onTaskChanged='updateTask($event, "tasksDone")')

</template>

<script lang="ts">
import Vue from 'vue';
import TaskStatus from '@/core/enums/task-status.enum';
import TaskCard from '@/components/TaskCard.vue';
import {TaskInterface} from '@/types/task.interface';
import draggable from 'vuedraggable';

export default Vue.extend({
  name: 'Kanban',
  data() {
    return {
      taskStatus: TaskStatus,
      tasksToDo: [] as TaskInterface[],
      tasksInProgress: [] as TaskInterface[],
      tasksDone: [] as TaskInterface[],

      currentTask: null,
    };
  },
  components: {
    TaskCard,
    draggable,
  },
  props: {
    msg: String,
  },
  created() {
    this.tasksToDo = [
      {
        title: 'Add Reference',
        description: 'All references should open in a new tab in browser. To view the reference, click on the eye',
        dateTo: '2021-10-27T21:39:54.159Z',
        status: 0,
        id: 1,
      },
      {
        title: 'Add Video',
        description: 'All references should open in a new tab in browser. To view the reference, click on the eye',
        dateTo: '2021-11-14T21:39:54.159Z',
        status: 0,
        id: 2,
      },
    ];
    this.tasksInProgress = [
      {
        title: 'Shared session',
        description:
          'This is the tab that relates to whether the session is shared (this is a sorting option for sessions',
        dateTo: '2021-08-23T21:39:54.159Z',
        status: 1,
        id: 3,
      },
    ];
    this.tasksDone = [
      {
        title: 'Wait for start',
        description: 'When the session has NOT been started yet, the user wont be allowed entering the system',
        dateTo: '2021-05-07T21:39:54.159Z',
        status: 2,
        id: 4,
      },
    ];
  },
  methods: {
    updateTask(task: any, array: string) {
      (this as any)[array].forEach((el: any, i: number) => {
        if (el.id === task.id) {
          Vue.set((this as any)[array], i, task);
        }
      });
    },
  },
});
</script>

<style scoped lang="scss">
@import '../scss/vars';
.tasks-column {
  width: 33.3%;
  margin: 5px;
  padding: 10px;
  &__title {
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 10px;
  }
  &.to-do {
    background: lightgray;
  }
  &.in-progress {
    background: lightblue;
    .tasks-column__title {
      color: #0e7ca1;
    }
  }
  &.done {
    background: #cef9c6;
    .tasks-column__title {
      color: green;
    }
    .card-wrapper {
      -webkit-user-drag: none;
    }
  }
  .kanban-column {
    min-height: 300px;
  }
}
</style>
