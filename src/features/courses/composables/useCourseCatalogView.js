import { onMounted, ref } from 'vue'
import { courseApiService } from '@/features/courses/api/services/courseApi.service'
import { formatCurrency } from '@/features/courses/utils/courseFormatting'

const accentTones = ['#dbeafe', '#bfdbfe', '#bae6fd', '#a5f3fc', '#c7d2fe']

export function useCourseCatalogView() {
  const courses = ref([])
  const isLoading = ref(true)
  const errorMessage = ref('')

  async function loadCourses() {
    isLoading.value = true
    errorMessage.value = ''

    try {
      courses.value = await courseApiService.getCourseCatalog()
    } catch (error) {
      errorMessage.value = error.message || 'We could not load courses right now.'
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    loadCourses()
  })

  return {
    accentTones,
    courses,
    errorMessage,
    formatCurrency,
    isLoading,
  }
}
