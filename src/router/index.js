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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CoursesView.vue'),
    },
    {
      path: '/loginView',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/loginView.vue'),
    },
  ],
})

export default router

// src/router.js
// import { createRouter, createWebHistory } from 'vue-router';
// import Home from '../views/HomeC.vue';
// import Tasks from '../views/TasksC.vue';
// import Login from '../views/LoginC.vue';

// const routes = [
//   { path: '/', name: 'Home', component: Home },
//   { path: '/tasks', name: 'Tasks', component: Tasks },
//   { path: '/login', name: 'Login', component: Login },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// export default router;
