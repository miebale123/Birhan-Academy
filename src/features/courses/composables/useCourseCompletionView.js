import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { courseApiService } from '@/features/courses/api/services/courseApi.service'
import { useCelebrationCanvas } from '@/features/courses/composables/useCelebrationCanvas'

export function useCourseCompletionView() {
  const route = useRoute()
  const router = useRouter()
  const { canvasElement } = useCelebrationCanvas()

  const course = ref(null)
  const isLoading = ref(true)
  const errorMessage = ref('')

  const courseId = computed(() => route.params.courseId?.toString() ?? '')

  async function loadCourse() {
    isLoading.value = true
    errorMessage.value = ''

    try {
      course.value = await courseApiService.getClassroom(courseId.value)
    } catch (error) {
      if (error.code === 'PAYMENT_REQUIRED') {
        await router.replace({ name: 'coursePayment', params: { courseId: courseId.value } })
        return
      }

      errorMessage.value = error.message || 'We could not load the completion page.'
    } finally {
      isLoading.value = false
    }
  }

  watch(courseId, loadCourse, { immediate: true })

  return {
    canvasElement,
    course,
    courseId,
    errorMessage,
    isLoading,
  }
}
