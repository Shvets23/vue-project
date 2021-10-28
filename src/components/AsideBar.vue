<template>
  <aside>
    <div class="aside-header-wrap">
      <div class="logo">
        <img src="../assets/img/Logo@3x.svg" alt="logo" />
        <span class="company-name">PROJECTUS</span>
      </div>
      <form action="/searc" class="search-form">
        <input type="text" id="search" />
        <div class="search-icon"></div>
      </form>
    </div>
    <div class="btn-menu">
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="chevron-right"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
        class="svg-inline--fa fa-chevron-right fa-w-10 fa-3x"
      >
        <path
          fill="currentColor"
          d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
          class=""
        ></path>
      </svg>
    </div>
    <div class="product-owner">
      <div class="owner-helper">
        <div class="owner-photo">
          <img src="../assets/img/girl1.jpg" alt="user-avatar" />
        </div>
        <div class="owner-wrap">
          <div class="owner-name">{{currentUser.userName}}</div>
          <div class="owner-desc">{{currentUser.userRole}}</div>
        </div>
      </div>
      <div class="more-info-wrap">•••</div>
    </div>
    <div class="aside-main-wrap">
      <div class="task-wrap">
        <div class="complited-task">
          <div class="task-count" id="completed">{{currentUser.completedTasks}}</div>
          <div class="task-status">Completed Tasks</div>
        </div>
        <div class="open-task" @click="completeTask()">
          <div class="task-count" id="open">{{currentUser.openedTasks}}</div>
          <div class="task-status">Open Tasks</div>
        </div>
      </div>
      <div class="menu-title">Menu</div>
      <nav>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">My Tasks</a>
          </li>
          <li>
            <a href="#">
              <span>Notifications</span>
              <div class="notification-icon" id="notification">{{notification}}</div>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AsideBar',
  props: ['notification'],
  methods: {
    completeTask () {
      this.currentUser.openedTasks ? this.changeTasksCount() : alert('Sorry, you have no open tasks.')
    },
    changeTasksCount () {
      if (confirm(this.confirmText)) {
        this.currentUser.completedTasks++
        this.currentUser.openedTasks--
      }
    }
  },
  data () {
    return {
      confirmText: 'Are you sure you want to change the number of tasks?',
      currentUser: {
        userName: 'Jean Gonzales',
        userRole: 'Product Owner',
        openedTasks: 5,
        completedTasks: 375
      }
    }
  }
})
</script>

<style scoped lang="scss">
@import "../scss/vars";
aside{
    background: #000;
    min-width: 270px;
    height: 100vh;
    transition: .3s;
    text-align: left;
    .aside-header-wrap{
        display: flex;
        padding: 30px;
        align-items: center;
        justify-content: space-between;
        .logo{
            display: flex;
            align-items: center;
        }
        .company-name{
            color: white;
            margin-left: 13px;
        }
        .search-form{
            margin-left: auto;
            .search-icon {
                &::before {
                    content: url(../assets/img/search.svg);
                    cursor: pointer;
                }
            }
        }
        input{
            display: none;
            transition: .3s;
        }
        .search-show{
            display: block;
            position: absolute;
            top: 22px;
            left: 30px;
            padding: 7px;
            transition: .3s;
        }
    }
    .product-owner{
        background: #202020;
        padding: 16px 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .owner-helper{
            display: flex;
            align-items: center;
        }
        .owner-photo{
            width: 48px;
            height: 48px;
            border-radius: 50%;
            overflow: hidden;
            background: $lg;
            margin-right: 15px;
            img{
                width: 100%;
            }
        }
        .owner-name{
            font-size: 14px;
            color: white;
            margin-bottom: 5px;
        }
        .owner-desc{
            font-size: 12px;
            color: #9B9B9B;
        }
        .more-info-wrap{
            color: #9B9B9B;
        }
    }
    .aside-main-wrap{
        padding: 20px 30px;
        .task-wrap{
            display: flex;
            color: white;
            margin-bottom: 30px;
            .complited-task{
                margin-right: 20px;
                cursor: pointer;
            }
            .task-count{
                font-size: 35px;
                margin-bottom: 5px;
            }
            .task-status{
                font-size: 12px;
                opacity: 0.5;
            }
        }
        .menu-title{
            color: #878787;
            text-transform: uppercase;
            font-size: 12px;
        }
        nav{
            li{
                margin-top: 15px;
            }
            a{
               font-size: 14px;
               color: white;
               text-decoration: none;
            }
            .notification-icon{
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
    .btn-menu{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 2px;
      display: none;
      svg{
          width: 10px;
          color: white;
      }
    }
    &.open-aside{
        left: 0;
        .btn-menu{
            display: none;
        }
    }
}
.open-task {
  cursor: pointer;
}
</style>
