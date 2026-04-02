import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { authCopy, authFeedbackCopy } from '@/features/auth/constants/authCopy'
import { useAuthStore } from '@/features/auth/stores/auth.store'
import { getSafeRedirectPath } from '@/shared/utils/getSafeRedirectPath'

export function useSignInView() {
  const route = useRoute()
  const router = useRouter()
  const authStore = useAuthStore()

  const formData = reactive({
    email: '',
    password: '',
  })
  const isSubmitting = ref(false)
  const feedback = reactive({
    type: 'info',
    message: '',
  })

  const copy = authCopy.signIn
  const feedbackCopy = authFeedbackCopy.signIn

  function setFeedback(type, message) {
    feedback.type = type
    feedback.message = message
  }

  function clearFeedback() {
    feedback.message = ''
  }

  function getRedirectTarget() {
    return getSafeRedirectPath(route.query.redirect) || { name: 'learningDashboard' }
  }

  function handleSocialSignin(provider) {
    setFeedback('info', feedbackCopy.socialSigninComingSoon(provider))
  }

  async function handleSignIn() {
    clearFeedback()

    if (!formData.email.trim()) {
      setFeedback('error', feedbackCopy.emailRequired)
      return
    }

    if (!formData.password) {
      setFeedback('error', feedbackCopy.passwordRequired)
      return
    }

    isSubmitting.value = true

    try {
      await authStore.signIn(formData)
      await router.push(getRedirectTarget())
    } catch (error) {
      setFeedback('error', error.message)
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    copy,
    feedback,
    formData,
    handleSignIn,
    handleSocialSignin,
    isSubmitting,
  }
}
