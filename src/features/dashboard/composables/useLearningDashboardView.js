import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '@/features/auth/stores/auth.store'
import { courseApiService } from '@/features/courses/api/services/courseApi.service'
import { formatCurrency } from '@/features/courses/utils/courseFormatting'
import { getCourseRoute } from '@/features/courses/utils/courseNavigation'

export function useLearningDashboardView() {
  const authStore = useAuthStore()

  const courses = ref([])
  const isLoading = ref(true)
  const errorMessage = ref('')

  const firstName = computed(() => authStore.firstName || 'Learner')

  const activeCourses = computed(() => {
    return courses.value.filter((course) => course.enrollment.status === 'enrolled')
  })

  const pendingCourses = computed(() => {
    return courses.value.filter((course) => course.enrollment.status === 'pending_payment')
  })

  const completedCourses = computed(() => {
    return courses.value.filter((course) => course.enrollment.status === 'completed')
  })

  const recommendedCourses = computed(() => {
    return courses.value.filter((course) => course.enrollment.status === 'browsing').slice(0, 3)
  })

  const summaryCards = computed(() => {
    return [
      {
        label: 'In class',
        value: activeCourses.value.length,
        tone: 'border-sky-300/18 bg-sky-400/10 text-sky-50',
      },
      {
        label: 'Payment required',
        value: pendingCourses.value.length,
        tone: 'border-amber-300/18 bg-amber-300/12 text-amber-100',
      },
      {
        label: 'Completed',
        value: completedCourses.value.length,
        tone: 'border-emerald-300/18 bg-emerald-300/12 text-emerald-100',
      },
    ]
  })

  async function loadCourses() {
    isLoading.value = true
    errorMessage.value = ''

    try {
      courses.value = await courseApiService.getCourseCatalog()
    } catch (error) {
      errorMessage.value = error.message || 'We could not load your learning dashboard right now.'
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    loadCourses()
  })

  return {
    activeCourses,
    completedCourses,
    errorMessage,
    firstName,
    formatCurrency,
    getCourseRoute,
    isLoading,
    pendingCourses,
    recommendedCourses,
    summaryCards,
  }
}
