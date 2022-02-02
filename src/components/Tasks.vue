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
    tr(v-for='(task, i) in tasks' :key="`task-${i}`"  :ref="el => { if (el) divs[i] = el }")
      td(@click='openModal(task)').task-title {{ task.title }}
      td(@click='openModal(task)') {{ task.description }}
      td.task-date {{formatTaskDate(task.dateTo)}}
      td
        img(src='../assets/img/delete.svg', @click='deleteTask(i)')
  task-modal(v-if="isOpenModal" @close="onTaskChange()" @onTaskChanged='onTaskChange()' :task='activeTask' :isNeedControls="true")
</template>

<script lang="ts">
import TaskModal from '@/modals/TaskModal.vue';
import {useStore} from 'vuex';
import {defineComponent} from 'vue';
import {ref, onBeforeUpdate, onMounted, onUpdated} from 'vue';
import openTaskModal from '@/composables/openModal';
import formatDate from '@/composables/formatDate';

export default defineComponent({
  setup() {
    const divs = ref([]);
    const store = useStore();
    let tasks: any = ref([]);
    tasks.value = store.getters['tasks/getTasks'];
    let taskCounter = ref(tasks.value.length);
    const {isOpenModal, activeTask, openModal, onTaskChange} = openTaskModal();
    const {formatTaskDate} = formatDate();
    onBeforeUpdate(() => {
      divs.value = [];
    });
    onMounted(() => {
      divs.value.forEach((el: HTMLElement, i: number) => {
        setTimeout(() => {
          el.classList.value = 'animated';
        }, i * 500);
      });
    });
    onUpdated(() => {
      if (taskCounter.value < tasks.value.length) {
        taskCounter.value++;
        divs.value.find((el: HTMLElement, i: number) => {
          if (i === divs.value.length - 1) {
            el.classList.value = 'new-task';
          }
        });
      }
    });

    const deleteTask = (i: number) => {
      store.commit('tasks/removeTask', i);
      taskCounter.value--;
    };

    return {
      divs,
      tasks,
      activeTask,
      isOpenModal,
      formatTaskDate,
      deleteTask,
      openModal,
      onTaskChange,
    };
  },
  name: 'Tasks',
  components: {TaskModal},
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
