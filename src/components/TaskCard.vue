<template lang="pug">
  .card-wrapper(:class="taskClasses")
    .task-wrapper(@click='openModal()')
      .task-title {{task.title}}
      .task-date {{formatDate}}
    task-modal(v-if="isOpenModal" @close="close()" @onTaskChanged='updateTask($event)' :task='task')
</template>

<script lang="ts">
import Vue from 'vue';
import TaskStatus from '@/core/enums/task-status.enum';
import TaskModal from '@/modals/TaskModal.vue';
import {TaskInterface} from '@/types/task.interface';
import moment from 'moment';

export default Vue.extend({
  name: 'TaskCard',
  data() {
    return {
      taskStatus: TaskStatus,
      isOpenModal: false,
      today: new Date(),
    };
  },
  props: {
    task: Object,
    index: Number,
  },
  components: {
    TaskModal,
  },
  computed: {
    taskClasses() {
      return {
        failed: new Date() > new Date(this.task.dateTo) && this.task.status != TaskStatus.DONE,
        bg_grey: this.task.status === TaskStatus.TO_DO,
        bg_blue: this.task.status === TaskStatus.IN_PROGRESS,
        bg_green: this.task.status === TaskStatus.DONE,
        expire:
          moment(this.task.dateTo).diff(moment(), 'hours') < 24 &&
          moment(this.task.dateTo).diff(moment(), 'hours') > 0 &&
          this.task.status != TaskStatus.DONE,
      };
    },
    formatDate(): string {
      return moment(this.task.dateTo).format('YYYY-MM-DD');
    },
  },
  methods: {
    close() {
      this.isOpenModal = false;
    },
    openModal() {
      this.isOpenModal = true;
    },
    updateTask(data: TaskInterface) {
      this.$emit('onTaskChanged', data);
      this.isOpenModal = false;
    },
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
