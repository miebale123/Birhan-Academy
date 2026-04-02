import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { courseApiService } from '@/features/courses/api/services/courseApi.service'

export function useCourseContentView() {
  const route = useRoute()
  const router = useRouter()

  const course = ref(null)
  const isLoading = ref(true)
  const isSelectingLesson = ref(false)
  const isCompleting = ref(false)
  const errorMessage = ref('')

  const courseId = computed(() => route.params.courseId?.toString() ?? '')

  const progressSummary = computed(() => {
    if (!course.value) {
      return '0 of 0 lessons'
    }

    const totalLessons = course.value.lessonsCount
    const lessonOrder = course.value.modules.flatMap((module) => module.lessons)
    const activeIndex = lessonOrder.findIndex((lesson) => lesson.id === course.value.activeLesson?.id)
    const currentNumber = activeIndex >= 0 ? activeIndex + 1 : 1
    return `${currentNumber} of ${totalLessons} lessons`
  })

  async function loadClassroom() {
    isLoading.value = true
    errorMessage.value = ''

    try {
      course.value = await courseApiService.getClassroom(courseId.value)
    } catch (error) {
      if (error.code === 'PAYMENT_REQUIRED') {
        await router.replace({ name: 'coursePayment', params: { courseId: courseId.value } })
        return
      }

      errorMessage.value = error.message || 'We could not load this classroom right now.'
    } finally {
      isLoading.value = false
    }
  }

  async function handleLessonSelection(lessonId) {
    if (!course.value || isSelectingLesson.value) {
      return
    }

    isSelectingLesson.value = true
    errorMessage.value = ''

    try {
      course.value = await courseApiService.selectLesson(courseId.value, lessonId)
    } catch (error) {
      errorMessage.value = error.message || 'We could not open that lesson right now.'
    } finally {
      isSelectingLesson.value = false
    }
  }

  async function handleCourseCompletion() {
    if (!course.value) {
      return
    }

    isCompleting.value = true
    errorMessage.value = ''

    try {
      await courseApiService.completeCourse(courseId.value)
      await router.push({ name: 'courseCompletion', params: { courseId: courseId.value } })
    } catch (error) {
      errorMessage.value = error.message || 'We could not complete this course right now.'
    } finally {
      isCompleting.value = false
    }
  }

  watch(courseId, loadClassroom, { immediate: true })

  return {
    course,
    errorMessage,
    handleCourseCompletion,
    handleLessonSelection,
    isCompleting,
    isLoading,
    isSelectingLesson,
    progressSummary,
  }
}
