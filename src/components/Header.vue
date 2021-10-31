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
          li(v-for='user in users' :key='user.id')
            a(href='#')
              img(:src='user.avatar' alt='user-avatar')
      .social-btns
        button.btn.btn-share Share
        button.btn.btn-chat Chat
  .tabs-section
    ul
      li.tab-link(v-for='tab in tabsList' :key='tab.id' @click='onTabChange(tab.url)' :class="{ 'active-tab': currentUrl === tab.url }")
        router-link(:to='tab.url') {{tab.name}}
</template>
<script lang="ts">
import Vue from 'vue';
import {UserInterface} from '@/types/user.interface';

export default Vue.extend({
  name: 'Header',
  data() {
    return {
      currentUrl: '',
      tabsList: [
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
      ],
      users: [
        {
          id: 1,
          userName: 'Test User',
          openedTasks: 0,
          completedTasks: 1,
          avatar:
            'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z2lybCUyMGZhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        },
        {
          id: 2,
          userName: 'Test User',
          openedTasks: 0,
          completedTasks: 1,
          avatar: 'https://yt3.ggpht.com/ytc/AKedOLT0A44VRLrEQcf1Usr0VxdSS2kHaG0PCsiPuWZdRA=s900-c-k-c0x00ffffff-no-rj',
        },
        {
          id: 3,
          userName: 'Test User',
          openedTasks: 0,
          completedTasks: 1,
          avatar:
            'https://cdn.shopify.com/s/files/1/0045/5104/9304/t/27/assets/AC_ECOM_SITE_2020_REFRESH_1_INDEX_M2_THUMBS-V2-1.jpg?v=8913815134086573859',
        },
      ] as UserInterface[],
      activeTab: 3,
    };
  },
  methods: {
    onTabChange(url: string) {
      this.currentUrl = url;
    },
  },
  created() {
    this.currentUrl = window.location.pathname;
  },
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
          img {
            width: 100%;
          }
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
        border-bottom: 2px solid $yellow;
        a {
          opacity: 1;
        }
      }
    }
  }
}
</style>
