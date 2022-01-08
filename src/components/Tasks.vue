<template lang="pug">
  .tab-item.active-item
    .tab-title Tasks
    .form-container
      h1(@click='isOpenModal = true') Add new task
    table(v-if='tasks.length')
      tr
        th Title
        th Description
        th Date
        th
      tr(v-for='(task, index) in tasks' :key="`task-${index}`" ref="tableRow")
        td.task-title {{ task.title }}
        td {{ task.description }}
        td.task-date {{ formatDate(task.dateTo) }}
        td
          img(src='../assets/img/delete.svg', @click='deleteTask(index)')
    task-modal(v-if="isOpenModal" @close="isOpenModal = false" @onTaskChanged='addTask($event)')
</template>

<script lang="ts">
import formatDate from '@/mixins/formatDate';
import {TaskInterface} from '@/types/task.interface';
import TaskModal from '@/modals/TaskModal.vue';
import TaskStatus from '@/core/enums/task-status.enum';

export default formatDate.extend({
  name: 'Tasks',
  data() {
    return {
      isOpenModal: false,
      tasks: [] as TaskInterface[],
      taskCounter: 0,
    };
  },
  components: {TaskModal},
  methods: {
    addTask(data: TaskInterface) {
      const newTask = data;
      newTask.id = Math.floor(Math.random() * 1000);
      this.tasks.push(newTask);
      this.isOpenModal = false;
    },
    deleteTask(i: number) {
      this.tasks.splice(i, 1);
      this.taskCounter = this.tasks.length;
    },
  },
  created() {
    this.tasks = [
      {
        title: 'Add Reference',
        description: 'All references should open in a new tab in browser. To view the reference, click on the eye',
        dateTo: '2021-10-27T21:39:54.159Z',
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
        status: 1,
        id: 3,
      },
      {
        title: 'Wait for start',
        description: 'When the session has NOT been started yet, the user wont be allowed entering the system',
        dateTo: '2021-05-07T21:39:54.159Z',
        status: 2,
        id: 4,
      },
    ];
    this.taskCounter = this.tasks.length;
  },
  mounted() {
    this.tasks.forEach((el: TaskInterface, i: number) => {
      setTimeout(() => {
        (this as any).$refs.tableRow[i].classList.value = 'animated';
      }, i * 500);
    });
  },
  updated() {
    if (this.taskCounter < this.tasks.length) {
      this.taskCounter++;
      (this as any).$refs.tableRow[(this as any).$refs.tableRow.length - 1].classList.value = 'new-task';
    }
  },
});
</script>

<style scoped lang="scss">
@import '../scss/vars';
.increase-text {
  font-size: 30px;
}
table {
  th,
  td {
    padding: 10px;
  }
  th {
    font-weight: bold;
  }
  tr {
    transition: 0.5s;
  }
  tr:nth-child(2n) {
    background: $lg;
  }
  .task-title {
    min-width: 180px;
  }
  .task-date {
    min-width: 100px;
  }
}
.form-container {
  h1 {
    transition: 0.2s;
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
  }
}

@keyframes textTransform {
  0% {
    font-size: 16px;
  }
  50% {
    font-size: 18px;
  }
  100% {
    font-size: 16px;
  }
}
@keyframes backgroundColor {
  0% {
    background: lightgreen;
  }
  25% {
    background: transparent;
  }
  50% {
    background: lightgreen;
  }
  75% {
    background: transparent;
  }
  100% {
    background: lightgreen;
  }
}
.animated {
  animation-name: textTransform;
  animation-duration: 1s;
}
.new-task {
  animation-name: backgroundColor;
  animation-duration: 2s;
}
</style>
