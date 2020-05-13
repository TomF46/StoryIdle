import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/tasks',
    component: () => import('../views/Main.vue'),
    children: [
      {

        path: 'tasks',
        component: () => import('../components/Tasks.vue')
      },
      {
        path: 'inventory',
        component: () => import('../views/Inventory.vue')
      },
      {
        path: 'shop',
        component: () => import('../views/Shop.vue')
      },
      {
        path: 'options',
        component: () => import('../views/Options.vue')
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
