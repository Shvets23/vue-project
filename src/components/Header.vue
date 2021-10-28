<template>
  <header>
    <div class="top-header">
      <div class="task-title-wrap">
        <div class="logo">
          <img src="../assets/img/logo.png" alt="logo" />
        </div>
        <div class="task-title">Website Redesign</div>
        <div class="more-info">•••</div>
      </div>
      <div class="social-wrap">
        <div class="users-section">
          <ul>
            <li v-for="user in users" :key="user.id">
              <a href="#">
                <img :src="user.avatar" alt="user-avatar" />
              </a>
            </li>
          </ul>
        </div>
        <div class="social-btns">
          <button class="btn btn-share">Share</button>
          <button class="btn btn-chat">Chat</button>
        </div>
      </div>
    </div>
    <div class="tabs-section">
      <ul>
        <li v-for="tab in tabsList"
            :key="tab.id"
            class="tab-link"
            @click="onTabChange(tab.id)"
            :class="{ 'active-tab': activeTab === tab.id }">{{tab.name}}</li>
      </ul>
    </div>
  </header>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Header',
  data () {
    return {
      tabsList: [
        {
          name: 'Tasks',
          id: 1
        },
        {
          name: 'Kanban',
          id: 2
        },
        {
          name: 'Activity',
          id: 3
        },
        {
          name: 'Calendar',
          id: 4
        },
        {
          name: 'Files',
          id: 5
        }
      ],
      users: [
        {
          id: 1,
          name: 'Test User',
          avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z2lybCUyMGZhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'
        },
        {
          id: 2,
          name: 'Test User',
          avatar: 'https://yt3.ggpht.com/ytc/AKedOLT0A44VRLrEQcf1Usr0VxdSS2kHaG0PCsiPuWZdRA=s900-c-k-c0x00ffffff-no-rj'
        },
        {
          id: 3,
          name: 'Test User',
          avatar: 'https://cdn.shopify.com/s/files/1/0045/5104/9304/t/27/assets/AC_ECOM_SITE_2020_REFRESH_1_INDEX_M2_THUMBS-V2-1.jpg?v=8913815134086573859'
        }
      ],
      activeTab: 3
    }
  },
  methods: {
    onTabChange (id: number) {
      this.activeTab = id
      this.$emit('onTabChange', id)
    }
  }
})
</script>
<style scoped lang="scss">
@import "../scss/vars";
header{
    background: #fff;
    box-shadow: 0 2px 15px rgba(202, 203, 214, .47);
    z-index: 7;
    position: relative;
    .top-header{
        padding: 35px 40px 20px 30px;
        display: flex;
        justify-content: space-between;
        .task-title-wrap{
            display: flex;
            align-items: center;
            .task-title{
                font-size: 32px;
                color: $dark;
                margin: 0 10px 0 15px;
            }
            .logo{
                background: $yellow;
                width: 40px;
                height: 40px;
                border-radius: 5px;
                img{
                    width: 100%;
                }
            }
            .more-info{
                height: 30px;
                width: 30px;
                color: #D8D8D8;
                background: $lg;
                text-align: center;
                line-height: 31px;
                border-radius: 50%;
                cursor: pointer;
            }
        }
        .social-wrap{
            display: flex;
            align-items: center;
            .social-btns{
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
            .users-section{
                margin-right: 15px;
                li{
                    height: 30px;
                    width: 30px;
                    background: $lg;
                    border-radius: 50%;
                    display: inline-block;
                    overflow: hidden;
                    cursor: pointer;
                    img{
                        width: 100%;
                    }
                }
                li + li {
                    margin-left: 5px;
                }
            }
        }
    }
    .tabs-section{
        ul{
            margin: 0 30px;
            display: flex;
            li + li {
                margin-left: 27px;
            }
            .tab-link{
                color: $dark;
                opacity: .7;
                padding-bottom: 14px;
                cursor: pointer;
            }
            .active-tab{
                opacity: 1;
                border-bottom: 2px solid $yellow;
            }
        }
    }
}
</style>
