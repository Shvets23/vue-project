<template lang="pug">
.tab-item.active-item
  .tab-title Kanban
  form.form-container
    .form-field
      input(placeholder="Search" v-model='searchKey')
    .form-field.direction-row
      input(type="text" onfocus="(this.type='date')" v-model='dateFrom' placeholder="Date from" onfocusout="(this.type='text')")
      input(type="text" onfocus="(this.type='date')" v-model='dateTo' placeholder="Date To" onfocusout="(this.type='text')")
  .clear_filters(@click='clearFilters()' v-if='dateTo || dateFrom || searchKey' ) Clear all filters
  .mobile-tabs
    .tab-item(:class="{active: isActiveToDo}" @click='changeActiveTab(taskStatus.TO_DO)') To do
    .tab-item(:class="{active: isActiveInProgress}" @click='changeActiveTab(taskStatus.IN_PROGRESS)') In Progress
    .tab-item(:class="{active: isActiveDone}" @click='changeActiveTab(taskStatus.DONE)') Done
  .container
    .tasks-column.to-do(:class="{active: isActiveToDo}")
      .tasks-column__title To Do
        |  ({{countToDo}})
      draggable(v-model='tasksToDo' group='people' @start='drag=true' @end='drag=false' item-key='id' @change='taskToDoChange')
        template(#item='{element}')
          task-card(:task='element')
    .tasks-column.in-progress(:class="{active: isActiveInProgress}")
      .tasks-column__title In Progress
        |  ({{countInProgress}})
      draggable(v-model='tasksInProgress' group='people' @start='drag=true' @end='drag=false' item-key='id' @change='taskInProgressChange')
        template(#item='{element}')
          task-card(:task='element')
    .tasks-column.done(:class="{active: isActiveDone}")
      .tasks-column__title Done
        |  ({{countDone}})
      draggable(v-model='tasksDone' group='people' @start='drag=true' @end='drag=false' item-key='id' @change='taskDoneChange')
        template(#item='{element}')
          task-card(:task='element')

</template>

<script lang="ts">
import {computed, defineComponent, ref, watch} from 'vue';
import TaskStatus from '@/core/enums/task-status.enum';
import TaskCard from '@/components/TaskCard.vue';
import {TaskInterface} from '@/types/task.interface';
import draggable from 'vuedraggable';
import moment from 'moment';
import {mapGetters, mapMutations, useStore} from 'vuex';

export default defineComponent({
  name: 'Kanban',
  setup() {
    const taskStatus = TaskStatus;
    const tasksToDo = ref([]);
    const tasksInProgress = ref([]);
    const tasksDone = ref([]);
    const searchKey = ref('');
    const tasks = ref([]);
    const filteredTasks = ref([]);
    const dateTo = ref('');
    const dateFrom = ref('');
    const activeTab = ref(0);
    const store = useStore();
    tasks.value = store.getters['tasks/getTasks'];
    filteredTasks.value = [...tasks.value];

    const countInProgress = computed(() => {
      return tasksInProgress.value.length;
    });
    const countToDo = computed(() => {
      return tasksToDo.value.length;
    });
    const countDone = computed(() => {
      return tasksDone.value.length;
    });
    const isActiveToDo = computed(() => {
      return activeTab.value === TaskStatus.TO_DO;
    });
    const isActiveInProgress = computed(() => {
      return activeTab.value === TaskStatus.IN_PROGRESS;
    });
    const isActiveDone = computed(() => {
      return activeTab.value === TaskStatus.DONE;
    });
    const updateTask = (task: TaskInterface) => {
      store.commit('tasks/updateTask', task);
    };
    const separateTasks = () => {
      tasksToDo.value = filteredTasks.value.filter((el: any) => el.status === TaskStatus.TO_DO);
      tasksInProgress.value = filteredTasks.value.filter((el: any) => el.status === TaskStatus.IN_PROGRESS);
      tasksDone.value = filteredTasks.value.filter((el: any) => el.status === TaskStatus.DONE);
    };
    separateTasks();
    const taskDoneChange = (data: any) => {
      let task = Object.assign({}, data.added?.element);
      task.status = TaskStatus.DONE;
      updateTask(task);
    };
    const taskToDoChange = (data: any) => {
      let task = Object.assign({}, data.added?.element);
      task.status = TaskStatus.TO_DO;
      updateTask(task);
    };
    const taskInProgressChange = (data: any) => {
      let task = Object.assign({}, data.added?.element);
      task.status = TaskStatus.IN_PROGRESS;
      updateTask(task);
    };
    const filterTasks = () => {
      filteredTasks.value = tasks.value.filter((task: TaskInterface) =>
        task.title.match(new RegExp(searchKey.value, 'i')),
      );
      const temporaryTasks = [...filteredTasks.value];
      if (!(dateTo.value && dateFrom.value)) return;
      filteredTasks.value = temporaryTasks.filter((task: TaskInterface) => {
        const taskDateMoment = moment(task.dateTo);
        return (
          taskDateMoment.isSameOrAfter(dateFrom.value, 'days') && taskDateMoment.isSameOrBefore(dateTo.value, 'days')
        );
      });
    };
    const clearFilters = () => {
      searchKey.value = '';
      dateFrom.value = '';
      dateTo.value = '';
    };
    const changeActiveTab = (tabIndex: number): void => {
      activeTab.value = tabIndex;
    };
    watch(tasks, separateTasks);
    watch(filteredTasks, separateTasks);
    watch(searchKey, filterTasks);
    watch(dateFrom, filterTasks);
    watch(dateTo, filterTasks);

    return {
      countToDo,
      countInProgress,
      countDone,
      changeActiveTab,
      clearFilters,
      taskInProgressChange,
      taskToDoChange,
      taskDoneChange,
      taskStatus,
      searchKey,
      dateFrom,
      dateTo,
      isActiveToDo,
      isActiveInProgress,
      isActiveDone,
      tasksToDo,
      tasksInProgress,
      tasksDone,
    };
  },
  components: {
    TaskCard,
    draggable,
  },
});
</script>

<style scoped lang="scss">
@import '../scss/vars';
.tab-item {
  position: relative;
}
.clear_filters {
  position: absolute;
  top: 70px;
  right: 0;
  cursor: pointer;
  color: #3333d3;
}
.form-container {
  margin-bottom: 20px;
}
.mobile-tabs {
  display: none;
}
.tasks-column {
  width: 33.3%;
  margin: 5px;
  padding: 10px;
  &__title {
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 10px;
  }
  &.to-do {
    background: lightgray;
  }
  &.in-progress {
    background: lightblue;
    .tasks-column__title {
      color: #0e7ca1;
    }
  }
  &.done {
    background: #cef9c6;
    .tasks-column__title {
      color: green;
    }
    .card-wrapper {
      -webkit-user-drag: none;
    }
  }
  .kanban-column {
    min-height: 300px;
  }
}
@media only screen and (max-width: 1200px) {
  .tasks-column__title {
    font-size: 18px;
  }
}
@media only screen and (max-width: 800px) {
  .tasks-column {
    display: none;
    &.active {
      display: block;
    }
  }
  .tasks-column {
    width: 100%;
  }
  .mobile-tabs {
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
    .tab-item {
      width: 97px;
      padding: 10px 0;

      border-bottom: 2px solid transparent;
      transition: 0.5s;
      cursor: pointer;

      &.active,
      &:hover {
        background: #f3f0f0;
        border-bottom: 2px solid #ffc200;
      }
    }
  }
  .form-container {
    max-width: 280px;
  }
}
</style>
