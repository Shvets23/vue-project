<template lang="pug">
.card-wrapper(:class="taskClasses")
  .task-wrapper(@click='openModal(task)')
    .task-title {{task.title}}
    .task-date {{formatTaskDate(task.dateTo)}}
  task-modal(v-if="isOpenModal" @close="onTaskChange()" @onTaskChanged='onTaskChange()' :task='task' :isNeedControls="true")
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import TaskStatus from '@/core/enums/task-status.enum';
import TaskModal from '@/modals/TaskModal.vue';
import moment from 'moment';
import openTaskModal from '@/composables/openModal';
import formatDate from '@/composables/formatDate';

export default defineComponent({
  setup(props) {
    const {isOpenModal, openModal, onTaskChange} = openTaskModal();
    const {formatTaskDate} = formatDate();
    const taskStatus = TaskStatus;
    const taskClasses = computed(() => {
      return {
        failed: new Date() > new Date(props.task.dateTo) && props.task.status != TaskStatus.DONE,
        bg_grey: props.task.status === TaskStatus.TO_DO,
        bg_blue: props.task.status === TaskStatus.IN_PROGRESS,
        bg_green: props.task.status === TaskStatus.DONE,
        expire:
          moment(props.task.dateTo).diff(moment(), 'hours') < 24 &&
          moment(props.task.dateTo).diff(moment(), 'hours') > 0 &&
          props.task.status != TaskStatus.DONE,
      };
    });

    return {
      isOpenModal,
      openModal,
      onTaskChange,
      formatTaskDate,
      taskClasses,
      taskStatus,
    };
  },
  name: 'TaskCard',
  props: ['task', 'index'],
  components: {
    TaskModal,
  },
});
</script>

<style scoped lang="scss">
.card-wrapper {
  padding: 15px;
  box-shadow: 2px 3px 10px 2px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 15px;
  background: white;
  .task-title {
    font-weight: 700;
    text-align: left;
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
  &.bg_grey {
    background: #9b9b9b;
  }
  &.bg_blue {
    background: #42a0bf;
  }
  &.bg_green {
    background: #42b983;
  }
  &.failed {
    background: #f38f8f;
    position: relative;
    &::before {
      content: 'Time is up!';
      color: white;
      position: absolute;
      top: 4px;
      right: 0;
      padding: 2px 5px;
      font-size: 10px;
      background: red;
    }
  }
  &.expire {
    position: relative;
    &::before {
      content: 'Expire';
      background: orange;
      color: white;
      position: absolute;
      top: 4px;
      right: 0;
      padding: 2px 5px;
      font-size: 10px;
    }
  }
}
</style>
