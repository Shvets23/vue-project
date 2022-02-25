<template lang="pug">
.modal-backdrop(@click.self="close()")
  .modal
    h2 Task details
    form.form-container(@submit.prevent="saveChanges()")
      .form-field.title(:class="{'not-active': !editMode}")
        label Title:
        input(v-model='newTask.title' :disabled='!editMode' @keyup='checkFormState()')
      .form-field.title(:class="{'not-active': !editMode}" v-if='!task.id')
        label Date to:
        input( :disabled='!editMode' @keyup='checkFormState()' type="date" v-model="newTask.dateTo")
      .form-field.description(:class="{'not-active': !editMode }")
        label Description:
        textarea(v-model='newTask.description' :disabled='!editMode'  @keyup='checkFormState()')
      .button-wrapper
        button.btn.cancel(@click="close()")
          span(v-if="!isNeedControls") Cancel
          span(v-if="isNeedControls") Close
        button.btn.btn-primary(type="submit" v-if='editMode && isChanged || !task') Save
        button.btn.btn-primary(@click="editMode = true" v-if='!editMode && isNeedControls' ) Edit
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import TaskStatus from '@/core/enums/task-status.enum';
import taskActions from '@/composables/taskComposable';

export default defineComponent({
  name: 'TaskModal',
  props: ['task', 'isNeedControls'],
  emits: ['close', 'onTaskChanged'],
  setup(props, {emit}) {
    const {updateTask, createTask} = taskActions();
    const defaultForm = Object.assign({}, props.task) as any;
    let editMode = ref(false);

    const newTask = Object.assign({}, props.task) as any;
    let isChanged = ref(false);
    const saveChanges = () => {
      let task = Object.assign({}, newTask);
      task.dateTo = new Date(task.dateTo).toISOString();
      if (task.id) {
        updateTask(task);
      } else {
        task.createdAt = new Date().toISOString();
        task.status = TaskStatus.TO_DO;
        task.id = Math.floor(Math.random() * 1000);
        createTask(task);
      }
      emit('onTaskChanged');
    };
    onMounted(() => {
      editMode.value = !props.task?.id;
    });
    const checkFormState = () => {
      for (let key in defaultForm) {
        if (defaultForm[key] != newTask[key]) {
          isChanged.value = true;
        }
      }
    };
    const close = () => {
      emit('close');
    };
    return {
      saveChanges,
      isChanged,
      editMode,
      close,
      checkFormState,
      newTask,
    };
  },
});
</script>

<style scoped lang="scss">
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
}

.modal {
  background: #ffffff;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  max-width: 800px;
  width: 100%;
  border-radius: 5px;
  z-index: 9;
  padding: 30px;
}

.form-container {
  width: 400px;
  textarea {
    height: 150px;
  }
  .form-field.not-active {
    input,
    textarea {
      border: none;
      background: #fff;
      resize: none;
      font-family: Helvetica, sans-serif;
    }
  }
  .button-wrapper {
    display: flex;
    justify-content: flex-end;
    button + button {
      margin-left: 15px;
    }
  }
}
</style>
