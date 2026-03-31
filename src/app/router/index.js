import { createRouter, createWebHistory } from 'vue-router'
import pinia from '@/app/pinia'
import { useAuthStore } from '@/features/auth/stores/auth.store'
import HomeView from '@/features/home/views/HomeView.vue'

function getSafeRedirectPath(value) {
  return typeof value === 'string' && value.startsWith('/') ? value : null
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/courses',
      name: 'courseCatalog',
      component: () => import('@/features/courses/views/CourseCatalogView.vue'),
    },
    {
      path: '/courses/:courseId',
      name: 'courseDetails',
      component: () => import('@/features/courses/views/CourseDetailsView.vue'),
    },
    {
      path: '/courses/:courseId/payment',
      name: 'coursePayment',
      meta: {
        requiresAuth: true,
      },
      component: () => import('@/features/courses/views/CoursePaymentView.vue'),
    },
    {
      path: '/courses/:courseId/class',
      name: 'courseContent',
      meta: {
        requiresAuth: true,
      },
      component: () => import('@/features/courses/views/CourseContentView.vue'),
    },
    {
      path: '/courses/:courseId/completion',
      name: 'courseCompletion',
      meta: {
        requiresAuth: true,
      },
      component: () => import('@/features/courses/views/CourseCompletionView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/features/site/views/SitePageView.vue'),
      props: { pageKey: 'about' },
    },
    {
      path: '/support',
      name: 'support',
      component: () => import('@/features/site/views/SitePageView.vue'),
      props: { pageKey: 'support' },
    },
    {
      path: '/privacy-policy',
      name: 'privacyPolicy',
      component: () => import('@/features/site/views/SitePageView.vue'),
      props: { pageKey: 'privacy' },
    },
    {
      path: '/terms-of-service',
      name: 'termsOfService',
      component: () => import('@/features/site/views/SitePageView.vue'),
      props: { pageKey: 'terms' },
    },
    {
      path: '/sign-up',
      alias: '/Sign Up',
      name: 'signUp',
      meta: {
        hideChrome: true,
        guestOnly: true,
      },
      component: () => import('@/features/auth/views/SignUpView.vue'),
    },
    {
      path: '/sign-in',
      alias: '/Sign In',
      name: 'signIn',
      meta: {
        hideChrome: true,
        guestOnly: true,
      },
      component: () => import('@/features/auth/views/SignInView.vue'),
    },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore(pinia)

  if (!authStore.isHydrated) {
    authStore.hydrate()
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      name: 'signIn',
      query: {
        redirect: to.fullPath,
      },
    }
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return getSafeRedirectPath(to.query.redirect) || { name: 'courseCatalog' }
  }

  return true
})

export default router
