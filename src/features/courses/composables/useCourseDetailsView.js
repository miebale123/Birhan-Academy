import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/features/auth/stores/auth.store'
import { courseApiService } from '@/features/courses/api/services/courseApi.service'
import { formatCurrency } from '@/features/courses/utils/courseFormatting'
import { getCourseRoute } from '@/features/courses/utils/courseNavigation'

export function useCourseDetailsView() {
  const route = useRoute()
  const router = useRouter()
  const authStore = useAuthStore()

  const course = ref(null)
  const isLoading = ref(true)
  const isOpening = ref(false)
  const errorMessage = ref('')

  const courseId = computed(() => route.params.courseId?.toString() ?? '')

  const primaryActionLabel = computed(() => {
    if (isOpening.value) {
      return 'Opening...'
    }

    if (!authStore.isAuthenticated) {
      return 'Sign in to continue'
    }

    return course.value?.enrollment.primaryActionLabel || 'Continue'
  })

  const actionHint = computed(() => {
    if (!course.value) {
      return ''
    }

    if (!authStore.isAuthenticated) {
      return 'Sign in first, then continue from this course into payment or the classroom.'
    }

    switch (course.value.enrollment.status) {
      case 'pending_payment':
        return 'Continue to checkout to unlock the classroom and lesson materials.'
      case 'enrolled':
        return 'Jump back into the classroom and continue your active lesson.'
      case 'completed':
        return 'Review your classroom progress or revisit the completion experience.'
      default:
        return 'Review the outline, outcomes, and instructor details before enrolling.'
    }
  })

  function getStatusBadgeVariant(status) {
    switch (status) {
      case 'completed':
        return 'success'
      case 'enrolled':
        return 'info'
      case 'pending_payment':
        return 'warning'
      default:
        return 'neutral'
    }
  }

  async function loadCourse() {
    isLoading.value = true
    errorMessage.value = ''

    try {
      course.value = await courseApiService.getCourseDetails(courseId.value)
    } catch (error) {
      errorMessage.value = error.message || 'We could not load this course right now.'
    } finally {
      isLoading.value = false
    }
  }

  async function handlePrimaryAction() {
    if (!course.value || isOpening.value) {
      return
    }

    isOpening.value = true
    errorMessage.value = ''

    try {
      const targetRoute = getCourseRoute(course.value)

      if (!authStore.isAuthenticated) {
        await router.push({
          name: 'signIn',
          query: {
            redirect: router.resolve(targetRoute).fullPath,
          },
        })
        return
      }

      await router.push(targetRoute)
    } catch (error) {
      errorMessage.value = error.message || 'We could not open the next course step right now.'
    } finally {
      isOpening.value = false
    }
  }

  watch(courseId, loadCourse, { immediate: true })

  return {
    actionHint,
    course,
    errorMessage,
    formatCurrency,
    getStatusBadgeVariant,
    handlePrimaryAction,
    isLoading,
    isOpening,
    primaryActionLabel,
  }
}
