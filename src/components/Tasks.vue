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
    tr(v-for='(task, i) in tasks' :key="`task-${i}`"  :ref="el => { if (el) divs[i] = el }" @click='openTaskModal(task)')
      td.task-title {{ task.title }}
      td {{ task.description }}
      td.task-date {{formatDate(task.dateTo)}}
      td
        img(src='../assets/img/delete.svg', @click='deleteTask(task.id)')
  task-modal(v-if="isOpenModal" @close="onTaskChange()" @onTaskChanged='onTaskChange()' :task='activeTask' :isNeedControls="true")
</template>

<script lang="ts">
import {TaskInterface} from '@/types/task.interface';
import TaskModal from '@/modals/TaskModal.vue';
import {mapGetters, mapMutations} from 'vuex';
import {defineComponent} from 'vue';
import moment from 'moment';
import {ref, reactive, onBeforeUpdate} from 'vue';
import TaskStatus from '@/core/enums/task-status.enum';

export default defineComponent({
  setup() {
    const list = reactive([1, 2, 3]);
    const divs = ref([]);
    onBeforeUpdate(() => {
      divs.value = [];
    });
    return {
      list,
      divs,
    };
  },
  name: 'Tasks',
  data() {
    return {
      isOpenModal: false,
      tasks: [] as TaskInterface[],
      taskCounter: 0,
      activeTask: {},
      defaultTask: {
        title: '',
        description: '',
        createdAt: '',
        dateTo: '',
        status: TaskStatus.TO_DO,
        id: '',
      },
    };
  },
  components: {TaskModal},
  methods: {
    ...mapMutations('tasks', ['removeTask']),
    onTaskChange() {
      this.isOpenModal = false;
      this.activeTask = this.defaultTask;
    },
    openTaskModal(task: any) {
      this.activeTask = task;
      this.isOpenModal = true;
    },
    deleteTask(i: number) {
      this.removeTask(i);
    },
    formatDate(date: string): string {
      return moment(date).format('YYYY-MM-DD');
    },
  },
  created() {
    this.tasks = this.getTasks;
    this.taskCounter = this.tasks.length;
    this.activeTask = this.defaultTask;
  },
  computed: {
    ...mapGetters('tasks', ['getTasks']),
  },
  mounted() {
    this.divs.forEach((el: HTMLElement, i: number) => {
      setTimeout(() => {
        el.classList.value = 'animated';
      }, i * 500);
    });
  },
  updated() {
    if (this.taskCounter < this.tasks.length) {
      this.taskCounter++;
      this.divs.find((el: HTMLElement, i: number) => {
        if (i === this.divs.length - 1) {
          el.classList.value = 'new-task';
        }
      });
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
    cursor: pointer;
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
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
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
