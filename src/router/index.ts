import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    children: [
      {
        path: '/tasks',
        component: () => import('../components/Tasks.vue')
      },
      {
        path: '/activity',
        component: () => import('../components/Activity.vue')
      },
      {
        path: '/kanban',
        component: () => import('../components/Kanban.vue')
      },
      {
        path: '/calendar',
        component: () => import('../components/Calendar.vue')
      },
      {
        path: '/files',
        component: () => import('../components/Files.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
