<template lang="pug">
.tab-item.active-item
  .tab-title Tasks
  table
    tr
      th Title
      th Description
      th Date
    tr(v-for='task in tasks' :key='task.id')
      td.task-title {{ task.title }}
      td {{ task.description }}
      td.task-date {{ formatDate(task.dateTo) }}

</template>

<script lang="ts">
import formatDate from '@/mixins/formatDate';
import {TaskInterface} from '@/types/task.interface';

export default formatDate.extend({
  name: 'Tasks',
  data() {
    return {
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
</style>
