import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { courseApiService } from '@/features/courses/api/services/courseApi.service'
import { formatCurrency } from '@/features/courses/utils/courseFormatting'

function createPaymentForm() {
  return {
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    country: 'Ethiopia',
  }
}

export function useCoursePaymentView() {
  const route = useRoute()
  const router = useRouter()

  const course = ref(null)
  const isLoading = ref(true)
  const isSubmitting = ref(false)
  const errorMessage = ref('')
  const paymentForm = ref(createPaymentForm())

  const courseId = computed(() => route.params.courseId?.toString() ?? '')

  async function loadPaymentContext() {
    isLoading.value = true
    errorMessage.value = ''

    try {
      const response = await courseApiService.getPaymentContext(courseId.value)

      if (response.enrollment.hasAccess) {
        await router.replace({ name: 'courseContent', params: { courseId: courseId.value } })
        return
      }

      course.value = response
    } catch (error) {
      errorMessage.value = error.message || 'We could not open checkout right now.'
    } finally {
      isLoading.value = false
    }
  }

  async function handlePayment() {
    isSubmitting.value = true
    errorMessage.value = ''

    try {
      await courseApiService.completePayment(courseId.value, paymentForm.value)
      await router.push({ name: 'courseContent', params: { courseId: courseId.value } })
    } catch (error) {
      errorMessage.value = error.message || 'Payment could not be completed right now.'
    } finally {
      isSubmitting.value = false
    }
  }

  watch(courseId, loadPaymentContext, { immediate: true })

  return {
    course,
    errorMessage,
    formatCurrency,
    handlePayment,
    isLoading,
    isSubmitting,
    paymentForm,
  }
}
