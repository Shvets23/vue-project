<template lang="pug">
.tab-item.active-item
  .tab-title Kanban

  table(v-if='tasks.length')
    tr
      th To do
      th In Progress
      th Done
    tr
      td
        .task-card(v-for='(task, index) in tasks' :key="`task-${index}`")
          task-card(:task='task' v-if='task.status === taskStatus.TO_DO')
      td
        .task-card(v-for='(task, index) in tasks' :key="`task-${index}`")
          task-card(:task='task' v-if='task.status === taskStatus.IN_PROGRESS')
      td
        .task-card(v-for='(task, index) in tasks' :key="`task-${index}`")
          task-card(:task='task' v-if='task.status === taskStatus.DONE')
</template>

<script lang="ts">
import Vue from 'vue';
import TaskStatus from '@/core/enums/task-status.enum';
import TaskCard from '@/components/TaskCard.vue';
import {TaskInterface} from '@/types/task.interface';

export default Vue.extend({
  name: 'Kanban',
  data() {
    return {
      taskStatus: TaskStatus,
      tasks: [] as TaskInterface[],
      drag: false,
    };
  },
  components: {
    TaskCard,
  },
  props: {
    msg: String,
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
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../scss/vars';
table {
  margin-top: 30px;
  th,
  td {
    padding: 10px;
    vertical-align: top;
  }
  th {
    font-weight: bold;
    background: $lg;
  }
  tr {
    transition: 0.5s;
  }
  .task-title {
    min-width: 180px;
  }
  .task-date {
    min-width: 100px;
  }
}
</style>
