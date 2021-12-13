<template lang="pug">
  .tab-item.active-item
    .tab-title Tasks
    .form-container
      h1 Add new task
      form(@submit.prevent="addTask()")
        .form-field
          label Title
          input(required, v-model='form.title' )
        .form-field
          label Description
          textarea(required, v-model='form.description' )
        button.btn(type="submit") Add task
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
</template>

<script lang="ts">
import formatDate from '@/mixins/formatDate';
import {TaskInterface} from '@/types/task.interface';
export default formatDate.extend({
  name: 'Tasks',
  data() {
    return {
      form: {
        title: '',
        description: '',
        dateTo: new Date().toISOString(),
        status: 0,
      },
      tasks: [] as TaskInterface[],
      taskCounter: 0,
    };
  },
  methods: {
    addTask() {
      const task = {...this.form};
      this.tasks.push(task);
      this.form.title = '';
      this.form.description = '';
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
        status: 0,
      },
      {
        title: 'Add Video',
        description: 'All references should open in a new tab in browser. To view the reference, click on the eye',
        dateTo: '2021-11-14T21:39:54.159Z',
        status: 0,
      },
      {
        title: 'Shared session',
        description:
          'This is the tab that relates to whether the session is shared (this is a sorting option for sessions',
        dateTo: '2021-08-23T21:39:54.159Z',
        status: 1,
      },
      {
        title: 'Wait for start',
        description: 'When the session has NOT been started yet, the user wont be allowed entering the system',
        dateTo: '2021-05-07T21:39:54.159Z',
        status: 2,
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
  width: 300px;
  margin: 0 auto;
  margin-top: 20px;
  .form-field {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 10px;
    input,
    textarea {
      width: 100%;
      border-radius: 8px;
      padding: 10px;
      border: 1px solid lightgray;
    }
    label {
      margin: 10px 0;
    }
  }
  .btn {
    margin-top: 20px;
  }
}
@keyframes textTransform {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1);
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
