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
import {defineComponent} from 'vue';
import TaskStatus from '@/core/enums/task-status.enum';
import TaskCard from '@/components/TaskCard.vue';
import {TaskInterface} from '@/types/task.interface';
import draggable from 'vuedraggable';
import moment from 'moment';
import {mapGetters, mapMutations, mapState} from 'vuex';

export default defineComponent({
  name: 'Kanban',
  data() {
    return {
      taskStatus: TaskStatus,
      tasksToDo: [] as TaskInterface[],
      tasksInProgress: [] as TaskInterface[],
      tasksDone: [] as TaskInterface[],
      currentTask: null,
      today: new Date(),
      searchKey: '',
      tasks: [] as TaskInterface[],
      filteredTasks: [] as TaskInterface[],
      dateTo: '',
      dateFrom: '',
      activeTab: 0,
    };
  },
  components: {
    TaskCard,
    draggable,
  },
  props: {
    msg: String,
  },
  created(): void {
    this.tasks = this.getTasks;
    this.filteredTasks = [...this.tasks];
  },
  watch: {
    tasks() {
      this.separateTasks();
    },
    filteredTasks() {
      this.separateTasks();
    },
    searchKey() {
      this.filterTasks();
    },
    dateFrom() {
      this.filterTasks();
    },
    dateTo() {
      this.filterTasks();
    },
  },
  computed: {
    ...mapGetters('tasks', ['getTasks']),

    countToDo(): number {
      return this.tasksToDo.length;
    },
    countInProgress(): number {
      return this.tasksInProgress.length;
    },
    countDone(): number {
      return this.tasksDone.length;
    },
    isActiveToDo(): boolean {
      return this.activeTab === TaskStatus.TO_DO;
    },
    isActiveInProgress(): boolean {
      return this.activeTab === TaskStatus.IN_PROGRESS;
    },
    isActiveDone(): boolean {
      return this.activeTab === TaskStatus.DONE;
    },
  },
  methods: {
    ...mapMutations('tasks', ['updateTask']),
    separateTasks() {
      this.tasksToDo = this.filteredTasks.filter((el) => el.status === TaskStatus.TO_DO);
      this.tasksInProgress = this.filteredTasks.filter((el) => el.status === TaskStatus.IN_PROGRESS);
      this.tasksDone = this.filteredTasks.filter((el) => el.status === TaskStatus.DONE);
    },
    taskDoneChange(data: any) {
      let task = Object.assign({}, data.added?.element);
      task.status = TaskStatus.DONE;
      this.updateTask(task);
    },
    taskToDoChange(data: any) {
      let task = Object.assign({}, data.added?.element);
      task.status = TaskStatus.TO_DO;
      this.updateTask(task);
    },
    taskInProgressChange(data: any) {
      let task = Object.assign({}, data.added?.element);
      task.status = TaskStatus.IN_PROGRESS;
      this.updateTask(task);
    },
    onUpdateTask(task: any) {
      this.updateTask(task);
    },
    filterTasks(): void {
      this.filteredTasks = this.tasks.filter((task) => task.title.match(new RegExp(this.searchKey, 'i')));
      const temporaryTasks = [...this.filteredTasks];
      if (!(this.dateTo && this.dateFrom)) return;
      this.filteredTasks = temporaryTasks.filter((task) => {
        const taskDateMoment = moment(task.dateTo);
        return (
          taskDateMoment.isSameOrAfter(this.dateFrom, 'days') && taskDateMoment.isSameOrBefore(this.dateTo, 'days')
        );
      });
    },
    clearFilters() {
      this.searchKey = '';
      this.dateFrom = '';
      this.dateTo = '';
    },
    changeActiveTab(tabIndex: number): void {
      this.activeTab = tabIndex;
    },
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
