<template lang="pug">
.tab-item.active-item
  .tab-title Tasks
  table
    tr
      th Title
      th Description
      th Date
      th
    tr(v-for='(task, index) in tasks' :key='index')
      td.task-title {{ task.title }}
      td {{ task.description }}
      td.task-date {{ formatDate(task.dateTo) }}
      td
        img(src='../assets/img/delete.svg', @click='deleteTask(index)')

  .form-container
    h1 Add new task
    form(@submit.prevent="addTask()", ref="anyName")
      .form-field
        label Title
        input(required, v-model='form.title' )
      .form-field
        label Description
        textarea(required, v-model='form.description' )
      button.btn(type="submit") Add task
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
        id: 1,
        dateTo: new Date().toISOString(),
      },
      tasks: [
        {
          id: 1,
          title: 'Add Reference',
          description: 'All references should open in a new tab in browser. To view the reference, click on the eye',
          dateTo: '2021-10-27T21:39:54.159Z',
        },
        {
          id: 2,
          title: 'Shared session',
          description:
            'This is the tab that relates to whether the session is shared (this is a sorting option for sessions',
          dateTo: '2021-10-27T21:39:54.159Z',
        },
        {
          id: 3,
          title: 'Wait for start',
          description: 'When the session has NOT been started yet, the user wont be allowed entering the system',
          dateTo: '2021-10-27T21:39:54.159Z',
        },
      ] as TaskInterface[],
    };
  },
  methods: {
    addTask() {
      this.form.id = this.tasks.length + 1;
      const task = {...this.form};
      this.tasks.push(task);
      this.form.title = '';
      this.form.description = '';
    },
    deleteTask(i: number) {
      this.tasks.splice(i, 1);
    },
  },
});
</script>

<style scoped lang="scss">
@import '../scss/vars';
table {
  th,
  td {
    padding: 10px;
  }
  th {
    font-weight: bold;
  }
  tr:nth-child(2n) {
    background: $lg;
  }
  .task-title {
    min-width: 150px;
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
</style>
