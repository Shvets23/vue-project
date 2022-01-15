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
    task-modal(v-if="isOpenModal" @close="isOpenModal = false" @onTaskChanged='addNewTask($event)')
</template>

<script lang="ts">
import formatDate from '@/mixins/formatDate';
import {TaskInterface} from '@/types/task.interface';
import TaskModal from '@/modals/TaskModal.vue';
import TaskStatus from '@/core/enums/task-status.enum';
import {mapGetters, mapMutations} from 'vuex';

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
    ...mapMutations('tasks', ['addTask']),
    addNewTask(data: TaskInterface) {
      const newTask = data;
      newTask.id = Math.floor(Math.random() * 1000);
      this.addTask(newTask);
      this.isOpenModal = false;
    },
    deleteTask(i: number) {
      this.tasks.splice(i, 1);
      this.taskCounter = this.tasks.length;
    },
  },
  created() {
    this.tasks = this.getTasks;
    this.taskCounter = this.tasks.length;
  },
  computed: {
    ...mapGetters('tasks', ['getTasks']),
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
