<template lang="pug">
  .card-wrapper
    .task-badge
      span(v-if='task.status === taskStatus.TO_DO') To Do
      span(v-if='task.status === taskStatus.IN_PROGRESS') In Progress
      span(v-if='task.status === taskStatus.DONE') Done
    .task-title {{task.title}}
    .task-date {{formatDate(task.dateTo)}}
</template>

<script lang="ts">
import TaskStatus from '@/core/enums/task-status.enum';
import formatDate from '@/mixins/formatDate';

export default formatDate.extend({
  name: 'TaskCard',
  data() {
    return {
      taskStatus: TaskStatus,
    };
  },
  props: {
    task: Object,
  },
});
</script>

<style scoped lang="scss">
.card-wrapper {
  padding: 15px;
  box-shadow: 2px 3px 10px 2px rgba(0, 0, 0, 0.1);
  position: relative;
  min-width: 200px;
  margin-bottom: 15px;
  .task-title {
    font-weight: 700;
  }
  .task-date {
    text-align: right;
    margin-top: 20px;
    color: grey;
  }
  .task-badge {
    position: absolute;
    top: 5px;
    right: 5px;
    background: #42a0bf;
    border-radius: 10px;
    font-size: 10px;
    color: #fff;
    padding: 2px 5px;
  }
}
</style>
