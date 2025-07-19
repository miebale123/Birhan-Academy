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
      path: '/CoursesView',
      name: 'CoursesView',
      component: () => import('../views/ContentsView.vue'),
    },
    {
      path: '/finishCourse',
      name: 'FinishCourse',
      component: () => import('../views/finishCourseView.vue'),
    },
    {
      path: '/Sign Up',
      name: 'SignUp',
      component: () => import('../views/signupView.vue'),
    }
  ],
})

export default router
