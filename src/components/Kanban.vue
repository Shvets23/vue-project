<template lang="pug">
.tab-item.active-item
  .tab-title Kanban
  form.form-container
    .form-field
      input(placeholder="Search" v-model='searchKey')
    .form-field.direction-row
      input(type="text" onfocus="(this.type='date')" v-model='dateFrom' placeholder="Date from" onfocusout="(this.type='text')")
      input(type="text" onfocus="(this.type='date')" v-model='dateTo' placeholder="Date To" onfocusout="(this.type='text')")
  .clear_filters(@click='clearFilters()' v-if='dateTo || dateTo || searchKey' ) Clear all filters
  .mobile-tabs
    .tab-item(:class="{active: activeTab === 'toDo'}" @click='activeTab = "toDo"') To do
    .tab-item(:class="{active: activeTab === 'inProgress'}" @click='activeTab = "inProgress"') In Progress
    .tab-item(:class="{active: activeTab === 'done'}" @click='activeTab = "done"') Done
  .container
    .tasks-column.to-do(:class="{active: activeTab === 'toDo'}")
      .tasks-column__title To Do
        |  ({{countToDo}})
      draggable.kanban-column(:list='tasksToDo' group='tasks' @change='taskToDoChange')
        task-card(v-for='(task, index) in tasksToDo' :key='index' :task='task' @onTaskChanged='updateTask($event, "tasksToDo")')
    .tasks-column.in-progress(:class="{active: activeTab === 'inProgress'}")
      .tasks-column__title In Progress
        |  ({{countInProgress}})
      draggable.kanban-column(:list='tasksInProgress' group='tasks' @change='taskInProgressChange')
        task-card(v-for='(task, index) in tasksInProgress' :key='index' :task='task'  @onTaskChanged='updateTask($event, "tasksInProgress")')
    .tasks-column.done(:class="{active: activeTab === 'done'}" @click='activeTab = "done"')
      .tasks-column__title Done
        |  ({{countDone}})
      draggable.kanban-column(:list='tasksDone' group='tasks' @change='taskDoneChange')
        task-card(v-for='(task, index) in tasksDone' :key='index' :task='task'  @onTaskChanged='updateTask($event, "tasksDone")')

</template>

<script lang="ts">
import Vue from 'vue';
import TaskStatus from '@/core/enums/task-status.enum';
import TaskCard from '@/components/TaskCard.vue';
import {TaskInterface} from '@/types/task.interface';
import draggable from 'vuedraggable';
import moment from 'moment';

export default Vue.extend({
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
      activeTab: 'toDo',
    };
  },
  components: {
    TaskCard,
    draggable,
  },
  props: {
    msg: String,
  },
  created() {
    this.tasks = [
      {
        title: 'Add Reference',
        description: 'All references should open in a new tab in browser. To view the reference, click on the eye',
        dateTo: '2022-01-10T18:51:33.659Z',
        status: TaskStatus.TO_DO,
        id: 1,
      },
      {
        title: 'Add Video',
        description: 'All references should open in a new tab in browser. To view the reference, click on the eye',
        dateTo: '2021-11-14T21:39:54.159Z',
        status: TaskStatus.TO_DO,
        id: 2,
      },
      {
        title: 'Shared session',
        description:
          'This is the tab that relates to whether the session is shared (this is a sorting option for sessions',
        dateTo: '2021-08-23T21:39:54.159Z',
        status: TaskStatus.IN_PROGRESS,
        id: 3,
      },
      {
        title: 'Private session',
        description:
          'This is the tab that relates to whether the session is shared (this is a sorting option for sessions)',
        dateTo: new Date(this.today.getTime() + 23 * 60 * 60 * 1000).toISOString(),
        status: TaskStatus.IN_PROGRESS,
        id: 33,
      },
      {
        title: 'Wait for start',
        description: 'When the session has NOT been started yet, the user wont be allowed entering the system',
        dateTo: '2021-05-07T21:39:54.159Z',
        status: TaskStatus.DONE,
        id: 4,
      },
    ];
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
    countToDo(): number {
      return this.tasksToDo.length;
    },
    countInProgress(): number {
      return this.tasksInProgress.length;
    },
    countDone(): number {
      return this.tasksDone.length;
    },
  },
  methods: {
    separateTasks() {
      this.tasksToDo = this.filteredTasks.filter((el) => el.status === TaskStatus.TO_DO);
      this.tasksInProgress = this.filteredTasks.filter((el) => el.status === TaskStatus.IN_PROGRESS);
      this.tasksDone = this.filteredTasks.filter((el) => el.status === TaskStatus.DONE);
    },
    taskDoneChange(data: any) {
      this.changeTaskStatus('tasksDone', data.added?.newIndex, TaskStatus.DONE);
    },
    taskToDoChange(data: any) {
      this.changeTaskStatus('tasksToDo', data.added?.newIndex, TaskStatus.TO_DO);
    },
    taskInProgressChange(data: any) {
      this.changeTaskStatus('tasksInProgress', data.added?.newIndex, TaskStatus.IN_PROGRESS);
    },
    changeTaskStatus(array: string, index: number, status: number) {
      if (index) {
        (this as any)[array][index]['status'] = status;
      }
    },
    updateTask(task: TaskInterface, array: string) {
      (this as any)[array].forEach((el: TaskInterface, i: number) => {
        if (el.id === task.id) {
          Vue.set((this as any)[array], i, task);
        }
      });
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
