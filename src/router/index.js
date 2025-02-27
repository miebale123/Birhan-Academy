import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },

    {
      path: '/Courses',
      name: 'Courses',
      component: () => import('../views/CoursesView.vue'),
    },
    {
      path: '/Contents',
      name: 'Contents',
      component: () => import('../views/ContentsView.vue'),
    },
  ],
})

export default router
