<template lang="pug">
.tab-item.active-item
  .tab-title Calendar
  .text-center.section
    v-calendar.custom-calendar.max-w-full(:masks='masks' :attributes='attributes' disable-page-swipe='' is-expanded='')
      template(v-slot:day-content='{ day, attributes }')
        .flex.flex-col.h-full.z-10.overflow-hidden
          span.day-label.text-sm.text-gray-900 {{ day.day }}
          .flex-grow.overflow-y-auto.overflow-x-auto
            p.text-xs.leading-tight.rounded-sm.p-1.mt-0.mb-1(v-for='(attr, index) in attributes' :key='index' @click="openModal(attr)")
              | {{ attr.customData.title }} {{ attr.title }}
  task-modal(v-if="isOpenModal" @close="close()" :task='activeTask' :isNeedControls="false")
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {mapGetters} from 'vuex';
import TaskModal from '@/modals/TaskModal.vue';

export default defineComponent({
  name: 'Calendar',
  props: {
    msg: String,
  },
  components: {TaskModal},
  data() {
    return {
      masks: {
        weekdays: 'WWW',
      },
      attributes: [],
      isOpenModal: false,
      activeTask: null,
    };
  },
  computed: {
    ...mapGetters('tasks', ['getTasks']),
  },
  created() {
    this.attributes = this.getTasks.map((el: any) => {
      el.dates = new Date(el.dateTo);
      el.customData = {
        title: el.title,
        description: el.description,
        id: el.id,
      };
      return el;
    });
  },
  methods: {
    close() {
      this.isOpenModal = false;
    },
    openModal(task: any) {
      this.activeTask = task.customData;
      this.isOpenModal = true;
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.tab-title {
  margin-bottom: 30px;
}
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-track {
  display: none;
}
.custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;
  border-radius: 0;
  width: 100%;
  & .vc-header {
    background-color: #f1f5f8;
    padding: 10px 0;
  }
  & .vc-weeks {
    padding: 0;
  }
  & .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }
  & .vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: white;
    width: 100px;
    height: 100px;
    border: 1px solid lightgray;
    &.weekday-1,
    &.weekday-7 {
      background-color: #eff8ff;
    }
    &:not(.on-bottom) {
      border-bottom: var(--day-border);
      &.weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }
    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }
  & .vc-day-dots {
    margin-bottom: 5px;
  }
  .vc-day {
    width: 100px;
    height: 100px;
    border: 1px solid lightgray !important;
  }
}
</style>
