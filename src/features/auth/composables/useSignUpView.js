import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { authCopy, authFeedbackCopy } from '@/features/auth/constants/authCopy'
import { useAuthStore } from '@/features/auth/stores/auth.store'
import { getSafeRedirectPath } from '@/shared/utils/getSafeRedirectPath'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function useSignUpView() {
  const route = useRoute()
  const router = useRouter()
  const authStore = useAuthStore()

  const formData = reactive({
    name: '',
    email: '',
    password: '',
  })
  const showPassword = ref(false)
  const agreement = ref(false)
  const isSubmitting = ref(false)
  const feedback = reactive({
    type: 'info',
    message: '',
  })

  const copy = authCopy.signUp
  const feedbackCopy = authFeedbackCopy.signUp

  function setFeedback(type, message) {
    feedback.type = type
    feedback.message = message
  }

  function clearFeedback() {
    feedback.message = ''
  }

  function resetForm() {
    formData.name = ''
    formData.email = ''
    formData.password = ''
    showPassword.value = false
    agreement.value = false
  }

  function getRedirectTarget() {
    return getSafeRedirectPath(route.query.redirect) || { name: 'learningDashboard' }
  }

  function handleSocialSignup(provider) {
    setFeedback('info', feedbackCopy.socialSignupComingSoon(provider))
  }

  function togglePasswordVisibility() {
    showPassword.value = !showPassword.value
  }

  async function handleSignup() {
    clearFeedback()

    if (!formData.name.trim()) {
      setFeedback('error', feedbackCopy.nameRequired)
      return
    }

    if (!formData.email.trim()) {
      setFeedback('error', feedbackCopy.emailRequired)
      return
    }

    if (formData.password.length < 8) {
      setFeedback('error', feedbackCopy.passwordTooShort)
      return
    }

    if (!agreement.value) {
      setFeedback('error', feedbackCopy.agreementRequired)
      return
    }

    if (!emailRegex.test(formData.email)) {
      setFeedback('error', feedbackCopy.invalidEmail)
      return
    }

    isSubmitting.value = true

    try {
      await authStore.signUp({
        ...formData,
        userType: 'freelancer',
      })
      resetForm()
      await router.push(getRedirectTarget())
    } catch (error) {
      setFeedback('error', error.message)
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    agreement,
    copy,
    feedback,
    formData,
    handleSignup,
    handleSocialSignup,
    isSubmitting,
    showPassword,
    togglePasswordVisibility,
  }
}
