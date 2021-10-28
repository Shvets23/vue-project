<template>
  <div class='container'>
    <Aside :notification="notificationsCount"/>
    <!-- /#aside -->
    <div class='main-block'>
      <Header @onTabChange='onTabChange($event)' />
      <main>
        <div class='tab-content'>
          <div class='tab-item active-item' id='tab3' v-if="activeTab === 3">
            <div class='tab-title'>Today</div>
            <div class="wrap-helper" v-for="message in messages" :key="message.id">
                <div class='tab-section'>
                    <div class='tab-desc'>
                        <div class='icon icon-approve' v-if="message.type == messageType.MARK"></div>
                        <div class='icon icon-mess' v-if="message.type == messageType.COMMENT"></div>
                        <div class='icon icon-upload' v-if="message.type == messageType.CONTENT"></div>
                        <p v-if="message.type != messageType.SYSTEM">{{message.text}}</p>
                    </div>
                    <div  v-if="message.type != messageType.SYSTEM" class='activity-time'>{{ formatDate(message.createdAt) }}</div>
                </div>
                <div class='mess-body' v-if="message.type == messageType.SYSTEM">{{message.text}}</div>
                <div class='upload-files' v-if="message.type == messageType.CONTENT && message.images.length">
                    <div class="img-wrap" v-for="(img, index) in message.images" :key="index" @click="notificationsCount = index">
                        <img :src="img">
                    </div>
                </div>
            </div>
          </div>
          <div class='tab-item active-item' id='tab2' v-if="activeTab === 2">
            <div class='tab-title'>Kanban</div>
          </div>
          <div class='tab-item active-item' id='tab1' v-if="activeTab === 1">
            <div class='tab-title'>Tasks</div>
            <Tasks/>
          </div>
          <div class='tab-item active-item' id='tab4' v-if="activeTab === 4">
            <div class='tab-title'>Calendar</div>
          </div>
          <div class='tab-item active-item' id='tab5' v-if="activeTab === 5">
            <div class='tab-title'>Files</div>
          </div>
        </div>
      </main>
    </div>
    <!-- /.main-block -->
  </div>
</template>

<script lang='ts'>
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import formatDate from '@/mixins/formatDate'
import MessageType from '@/core/enums/message-type.enum'
import Tasks from '@/components/Tasks.vue'

export default formatDate.extend({
  name: 'activity',
  mixins: [formatDate],
  components: {
    Header,
    Aside,
    Tasks
  },
  data () {
    return {
      activeTab: 3,
      messageType: MessageType,
      notificationsCount: 2,
      messages: [
        {
          type: 'mark',
          text: 'Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users',
          createdAt: '2021-10-27T21:39:54.159Z',
          images: [],
          id: 1
        },
        {
          type: 'comment',
          text: 'Emilee Simchenko commented on Account for teams and personal in bottom style',
          createdAt: '2021-10-27T21:39:54.159Z',
          images: [],
          id: 2
        },
        {
          type: 'system',
          text: 'During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes',
          createdAt: '2021-10-27T21:39:54.159Z',
          images: [],
          id: 3
        },
        {
          type: 'content',
          text: 'Emilee Simchenko commented on Account for teams and personal in bottom style',
          createdAt: '2021-10-27T21:39:54.159Z',
          images: ['https://i.pinimg.com/originals/97/89/b0/9789b0dba1b81f2b6ae96cf1d0067f0a.jpg', 'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg'],
          id: 4
        }
      ]
    }
  },
  methods: {
    onTabChange (id: number) {
      this.activeTab = id
    }
  }
})
</script>
<style lang='scss' scoped>
@import '../scss/vars';
.tab-content {
  padding: 35px 30px 90px;
  background: #fff;
  width: 70%;
  margin-top: 30px;
  margin-bottom: 30px;
  border-radius: 15px;
  height: fit-content;
  .tab-item {
    display: none;
    &.active-item {
      display: block;
    }
    .tab-title {
      opacity: 0.5;
      color: $dark;
      font-size: 14px;
      text-transform: uppercase;
    }
    .tab-section {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      color: $dark;
      .tab-desc {
        display: flex;
        align-items: center;
      }
      .icon {
        background: #cef9c6;
        min-width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        &::before {
          width: 12px;
          height: 12px;
        }
        &.icon-approve {
          &::before {
            content: url(../assets/img/icon.svg);
          }
        }
        &.icon-mess {
          &::before {
            content: url(../assets/img/icon-mess.svg);
          }
        }
        &.icon-upload {
          &::before {
            content: url(../assets/img/icon-upload.svg);
          }
        }
      }
      .icon-mess {
        background: #fff8dd;
      }
      .icon-upload {
        background: #e3efff;
        svg {
          transform: rotate(180deg);
        }
      }
      svg {
        width: 12px;
      }
      p {
        font-size: 16px;
        line-height: 20px;
      }
      .activity-time {
        font-size: 14px;
        opacity: 0.7;
        white-space: nowrap;
      }
    }
    .mess-body {
      background: $lg;
      border-radius: 15px;
      color: $dark;
      font-size: 15px;
      padding: 20px 30px;
      margin: 20px 90px 0;
      line-height: 18px;
    }
    .upload-files {
      margin: 20px 90px 0;
      display: flex;
      flex-wrap: wrap;
      .img-wrap {
        background: $lg;
        border-radius: 15px;
        max-width: 100px;
        height: 100px;
        margin-left: 10px;
        margin-top: 10px;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
    }
  }
}
@media only screen and (max-width: 1050px) {
  .tab-content {
    width: 80%;
  }
}
@media only screen and (max-width: 992px) {
  #aside {
    position: fixed;
    top: 0;
    left: -255px;
    z-index: 9;
    .btn-menu {
      display: block;
    }
  }
}
@media only screen and (max-width: 750px) {
  header {
    .top-header {
      flex-direction: column;
      .social-wrap {
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
@media only screen and (max-width: 580px) {
  .tab-content {
    width: 90%;
    margin-left: 10px;
    .tab-item {
      .mess-body,
      .upload-files {
        margin: 20px 40px 0;
      }
    }
  }
}
@media only screen and (max-width: 425px) {
  header {
    .top-header {
      .task-title-wrap {
        .task-title {
          font-size: 25px;
        }
      }
    }
    .tabs-section {
      ul li + li {
        margin-left: 10px;
      }
    }
  }
}
@media only screen and (max-width: 390px) {
  header {
    .top-header {
      .task-title-wrap {
        .task-title {
          font-size: 17px;
        }
      }
      .social-wrap {
        flex-direction: column;
        .users-section {
          margin-bottom: 15px;
          margin-right: 0;
        }
      }
    }
    .tabs-section {
      display: flex;
      justify-content: center;
      li {
        font-size: 14px;
      }
      ul li + li {
        margin-left: 7px;
      }
    }
  }
  .tab-content {
    padding: 30px 25px 90px;
    .tab-item {
      .mess-body {
        margin: 20px 20px 0;
      }
      .tab-section {
        flex-direction: column;
      }
    }
  }
}
</style>
