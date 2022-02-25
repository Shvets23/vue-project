<template lang="pug">
aside(id='aside', :class="{ 'open-aside': isAsideOpen }" )
  .aside-header-wrap
    .logo
      img(src='../assets/img/Logo@3x.svg' alt='logo')
      span.company-name PROJECTUS
    form.search-form(action='/searc')
      input#search(type='text')
      .search-icon
  .btn-menu
    img(src='../assets/img/menu.svg', @click='isAsideOpen = !isAsideOpen')
  user(:user='currentUser')
  .aside-main-wrap
    .task-wrap
      .complited-task
        #completed.task-count {{currentUser.completedTasks}}
        .task-status Completed Tasks
      .open-task(@click='completeTask()')
        #open.task-count {{currentUser.openedTasks}}
        .task-status Open Tasks
    .menu-title Menu
    nav
      ul
        li
          a(href='#') Home
        li
          a(href='#') My Tasks
        li
          a(href='#')
            span Notifications
            #notification.notification-icon {{notification}}

</template>
<script lang="ts">
import {defineComponent, ref} from 'vue';
import {UserInterface} from '@/types/user.interface';
import User from '@/components/User.vue';
import {useStore} from 'vuex';
import {useRouter, useRoute} from 'vue-router';

export default defineComponent({
  name: 'AsideBar',
  props: {
    notification: Number,
  },
  components: {
    User,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const isAsideOpen = ref(false);
    const confirmText = 'Are you sure you want to change the number of tasks?';
    const currentUser = ref(store.getters['users/getMe']);
    const completeTask = () => {
      currentUser.value.openedTasks ? navigateToTask() : alert('Sorry, you have no open tasks.');
    };
    const navigateToTask = () => {
      router.push({path: '/tasks'});
    };
    const changeTasksCount = () => {
      if (confirm(confirmText)) {
        currentUser.value.completedTasks++;
        currentUser.value.openedTasks--;
      }
    };
    return {
      changeTasksCount,
      completeTask,
      currentUser,
      isAsideOpen,
    };
  },
});
</script>

<style scoped lang="scss">
@import '../scss/vars';
aside {
  background: #000;
  min-width: 270px;
  height: 100vh;
  transition: 0.3s;
  text-align: left;
  .aside-header-wrap {
    display: flex;
    padding: 30px;
    align-items: center;
    justify-content: space-between;
    .logo {
      display: flex;
      align-items: center;
    }
    .company-name {
      color: white;
      margin-left: 13px;
    }
    .search-form {
      margin-left: auto;
      .search-icon {
        &::before {
          content: url(../assets/img/search.svg);
          cursor: pointer;
        }
      }
    }
    input {
      display: none;
      transition: 0.3s;
    }
    .search-show {
      display: block;
      position: absolute;
      top: 22px;
      left: 30px;
      padding: 7px;
      transition: 0.3s;
    }
  }

  .aside-main-wrap {
    padding: 20px 30px;
    .task-wrap {
      display: flex;
      color: white;
      margin-bottom: 30px;
      .complited-task {
        margin-right: 20px;
        cursor: pointer;
      }
      .task-count {
        font-size: 35px;
        margin-bottom: 5px;
      }
      .task-status {
        font-size: 12px;
        opacity: 0.5;
      }
    }
    .menu-title {
      color: #878787;
      text-transform: uppercase;
      font-size: 12px;
    }
    nav {
      li {
        margin-top: 15px;
      }
      a {
        font-size: 14px;
        color: white;
        text-decoration: none;
      }
      .notification-icon {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: $yellow;
        color: $dark;
        display: inline-block;
        text-align: center;
        line-height: 20px;
        margin-left: 5px;
      }
    }
  }
  .btn-menu {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 2px;
    display: none;
    svg {
      width: 10px;
      color: white;
    }
  }
  &.open-aside {
    left: 0;
    .btn-menu {
      display: none;
    }
  }
}
.open-task {
  cursor: pointer;
}
</style>
