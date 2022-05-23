import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
    path: '/', // alias: '',路由別名
    alias: '/tracker',
    name: 'tracker',
    // mata: {
    //   title: 'IP Tracker' 
    // },
    component: () => import( /* webpackChunkName: "tracker" */ '../components/Tracker/Layout.vue')
  },
  {
    path: "/todo",
    name: "todo",
    component: () => import( /* webpackChunkName: "todo" */ '../components/Todo/Layout.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router