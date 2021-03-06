<template lang="pug">
header
  .top-header
    .task-title-wrap
      .logo
        img(src='../assets/img/logo.png' alt='logo')
      .task-title Website Redesign
      .more-info &bull;&bull;&bull;
    .social-wrap
      .users-section
        ul
          li(v-for='user in users' :key="`user-${user.id}`")
            user-avatar(:user='user')
      .social-btns
        button.btn.btn-share Share
        button.btn.btn-chat Chat
  .tabs-section
    ul
      li.tab-link(v-for='tab in tabsList' :key="`tab-${tab.id}`" @click='onTabChange(tab.url)' :class="{ 'active-tab': currentUrl === tab.url }")
        router-link(:to='tab.url') {{tab.name}}
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue';
import UserAvatar from '@/components/UserAvatar.vue';
import {useStore} from 'vuex';

export default defineComponent({
  name: 'Header',
  setup() {
    const currentUrl = ref('');
    const store = useStore();
    const tabsList = [
      {
        name: 'Tasks',
        id: 1,
        url: '/tasks',
      },
      {
        name: 'Kanban',
        id: 2,
        url: '/kanban',
      },
      {
        name: 'Activity',
        id: 3,
        url: '/activity',
      },
      {
        name: 'Calendar',
        id: 4,
        url: '/calendar',
      },
      {
        name: 'Files',
        id: 5,
        url: '/files',
      },
    ];
    const users = store.getters['users/getUsers'];
    const onTabChange = (url: string) => {
      currentUrl.value = url;
    };
    currentUrl.value = window.location.pathname;
    return {
      users,
      tabsList,
      currentUrl,
      onTabChange,
    };
  },
  components: {UserAvatar},
});
</script>
<style scoped lang="scss">
@import '../scss/vars';
header {
  background: #fff;
  box-shadow: 0 2px 15px rgba(202, 203, 214, 0.47);
  z-index: 7;
  position: relative;
  .top-header {
    padding: 35px 40px 20px 30px;
    display: flex;
    justify-content: space-between;
    .task-title-wrap {
      display: flex;
      align-items: center;
      .task-title {
        font-size: 32px;
        color: $dark;
        margin: 0 10px 0 15px;
      }
      .logo {
        background: $yellow;
        width: 40px;
        height: 40px;
        border-radius: 5px;
        img {
          width: 100%;
        }
      }
      .more-info {
        height: 30px;
        width: 30px;
        color: #d8d8d8;
        background: $lg;
        text-align: center;
        line-height: 31px;
        border-radius: 50%;
        cursor: pointer;
      }
    }
    .social-wrap {
      display: flex;
      align-items: center;
      .social-btns {
        display: flex;
        align-items: center;
        .btn-chat {
          display: flex;
          align-items: center;
          &::before {
            content: url(../assets/img/chat.svg);
            margin-right: 5px;
          }
        }
      }
      .users-section {
        margin-right: 15px;
        li {
          height: 30px;
          width: 30px;
          background: $lg;
          border-radius: 50%;
          display: inline-block;
          overflow: hidden;
          cursor: pointer;
        }
        li + li {
          margin-left: 5px;
        }
      }
    }
  }
  .tabs-section {
    ul {
      margin: 0 30px;
      display: flex;
      li + li {
        margin-left: 27px;
      }
      .tab-link a {
        color: $dark;
        opacity: 0.7;
        padding-bottom: 14px;
        cursor: pointer;
        text-decoration: none;
        padding-bottom: 7px;
        display: block;
      }
      .active-tab {
        a {
          opacity: 1;
        }
      }
      .router-link-active {
        border-bottom: 2px solid $yellow;
      }
    }
  }
}
</style>
