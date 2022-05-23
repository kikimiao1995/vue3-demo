import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
    path: '/', // alias: '',路由別名
    alias: '/tracker',
    name: 'tracker',
    meta: {
      title: 'Vue3 Practice' 
    },
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

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`
  next()
})

export default router