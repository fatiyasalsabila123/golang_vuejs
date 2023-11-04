import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/main.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main.vue')
    }
  ]
})

export default router
