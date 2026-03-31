<template>
  <section class="signin-shell">
    <div class="signin-stage">
      <div class="signin-card">
        <h1 class="signin-title">{{ copy.title }}</h1>

        <p
          v-if="feedback.message"
          :class="['feedback-banner', `feedback-banner-${feedback.type}`]"
          role="status"
          aria-live="polite"
        >
          {{ feedback.message }}
        </p>

        <form @submit.prevent="handleSignIn" class="signin-form" novalidate>
          <div class="field">
            <label for="email">{{ copy.fields.email.label }}</label>
            <div class="input-shell">
              <span class="input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="img">
                  <path
                    fill="currentColor"
                    d="M3.75 6.5A2.75 2.75 0 0 1 6.5 3.75h11A2.75 2.75 0 0 1 20.25 6.5v11A2.75 2.75 0 0 1 17.5 20.25h-11A2.75 2.75 0 0 1 3.75 17.5v-11Zm2.19-.56 5.62 4.4a.7.7 0 0 0 .88 0l5.62-4.4a1.24 1.24 0 0 0-.56-.13h-11c-.2 0-.39.05-.56.13Zm12.81 1.39-5.43 4.25a2.2 2.2 0 0 1-2.64 0L5.25 7.33v10.17c0 .69.56 1.25 1.25 1.25h11c.69 0 1.25-.56 1.25-1.25V7.33Z"
                  />
                </svg>
              </span>
              <input
                id="email"
                v-model.trim="formData.email"
                type="email"
                autocomplete="email"
                inputmode="email"
                :placeholder="copy.fields.email.placeholder"
                required
                class="input-field"
              />
            </div>
          </div>

          <div class="field">
            <label for="password">{{ copy.fields.password.label }}</label>
            <div class="input-shell">
              <span class="input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="img">
                  <path
                    fill="currentColor"
                    d="M7.5 10V8.75a4.5 4.5 0 1 1 9 0V10h.75A2.75 2.75 0 0 1 20 12.75v5.5A2.75 2.75 0 0 1 17.25 21h-10.5A2.75 2.75 0 0 1 4 18.25v-5.5A2.75 2.75 0 0 1 6.75 10h.75Zm1.5 0h6V8.75a3 3 0 1 0-6 0V10Zm3 3a1.75 1.75 0 0 0-.75 3.33V17.5a.75.75 0 0 0 1.5 0v-1.17A1.75 1.75 0 0 0 12 13Z"
                  />
                </svg>
              </span>
              <input
                id="password"
                v-model="formData.password"
                type="password"
                autocomplete="current-password"
                :placeholder="copy.fields.password.placeholder"
                required
                class="input-field"
              />
            </div>
          </div>

          <button type="submit" class="submit-button" :disabled="isSubmitting">
            {{ isSubmitting ? copy.submittingLabel : copy.submitLabel }}
          </button>
        </form>

        <div class="social-divider" aria-hidden="true">
          <span>or</span>
        </div>

        <div class="social-stack">
          <button
            type="button"
            class="social-button social-button-google"
            :disabled="isSubmitting"
            @click="handleSocialSignin('Google')"
          >
            <span class="social-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="img">
                <path
                  fill="#EA4335"
                  d="M12 10.2v3.92h5.45c-.24 1.26-.96 2.33-2.05 3.05l3.31 2.57c1.93-1.78 3.04-4.4 3.04-7.52 0-.72-.06-1.39-.19-2.02H12Z"
                />
                <path
                  fill="#34A853"
                  d="M12 22c2.76 0 5.07-.91 6.76-2.46l-3.31-2.57c-.91.61-2.08.97-3.45.97-2.65 0-4.9-1.79-5.7-4.2l-3.42 2.64C4.56 19.7 8.01 22 12 22Z"
                />
                <path
                  fill="#4A90E2"
                  d="M6.3 13.74c-.21-.61-.33-1.26-.33-1.94s.12-1.33.33-1.94L2.88 7.22A9.98 9.98 0 0 0 2 11.8c0 1.61.38 3.13 1.06 4.46l3.24-2.52Z"
                />
                <path
                  fill="#FBBC05"
                  d="M12 5.67c1.5 0 2.85.52 3.91 1.54l2.93-2.93C17.06 2.62 14.76 1.6 12 1.6c-3.99 0-7.44 2.3-9.12 5.62L6.3 9.86c.8-2.41 3.05-4.19 5.7-4.19Z"
                />
              </svg>
            </span>
            <span>{{ copy.socialButtons.google }}</span>
          </button>

          <button
            type="button"
            class="social-button social-button-apple"
            :disabled="isSubmitting"
            @click="handleSocialSignin('Apple')"
          >
            <span class="social-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="img">
                <path
                  fill="currentColor"
                  d="M15.18 12.12c.03 2.58 2.27 3.43 2.29 3.44-.02.06-.35 1.2-1.15 2.38-.69 1.02-1.41 2.04-2.55 2.06-1.12.02-1.48-.66-2.77-.66-1.29 0-1.69.64-2.75.68-1.1.04-1.95-1.1-2.64-2.12-1.41-2.04-2.49-5.76-1.04-8.27.72-1.25 2.02-2.04 3.43-2.06 1.07-.02 2.08.72 2.76.72.68 0 1.95-.89 3.29-.76.56.02 2.13.23 3.14 1.71-.08.05-1.87 1.08-1.85 3.22Zm-2.22-7.97c.58-.71.97-1.69.86-2.67-.84.03-1.86.56-2.46 1.27-.54.62-1.01 1.61-.88 2.56.94.07 1.9-.48 2.48-1.16Z"
                />
              </svg>
            </span>
            <span>{{ copy.socialButtons.apple }}</span>
          </button>
        </div>

        <p class="auth-switch">
          {{ copy.switchPrompt }}
          <RouterLink
            :to="{
              name: 'signUp',
              query: $route.query.redirect ? { redirect: $route.query.redirect } : undefined,
            }"
            class="auth-switch-link"
          >
            {{ copy.switchAction }}
          </RouterLink>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { authCopy, authFeedbackCopy } from '@/features/auth/constants/authCopy'
import { useAuthStore } from '@/features/auth/stores/auth.store'

export default {
  data() {
    return {
      copy: authCopy.signIn,
      feedbackCopy: authFeedbackCopy.signIn,
      formData: {
        email: '',
        password: '',
      },
      isSubmitting: false,
      feedback: {
        type: 'info',
        message: '',
      },
    }
  },
  methods: {
    setFeedback(type, message) {
      this.feedback = { type, message }
    },
    clearFeedback() {
      if (this.feedback.message) {
        this.feedback.message = ''
      }
    },
    handleSocialSignin(provider) {
      this.setFeedback('info', this.feedbackCopy.socialSigninComingSoon(provider))
    },
    getRedirectTarget() {
      const redirect = this.$route.query.redirect
      return typeof redirect === 'string' && redirect.startsWith('/')
        ? redirect
        : { name: 'courseCatalog' }
    },
    async handleSignIn() {
      this.clearFeedback()

      if (!this.formData.email.trim()) {
        this.setFeedback('error', this.feedbackCopy.emailRequired)
        return
      }

      if (!this.formData.password) {
        this.setFeedback('error', this.feedbackCopy.passwordRequired)
        return
      }

      this.isSubmitting = true

      try {
        const authStore = useAuthStore()
        await authStore.signIn(this.formData)
        await this.$router.push(this.getRedirectTarget())
      } catch (error) {
        console.error('Sign in error:', error)
        this.setFeedback('error', error.message)
      } finally {
        this.isSubmitting = false
      }
    },
  },
}
</script>

<style scoped>
.signin-shell {
  display: flex;
  min-height: 100svh;
  overflow-x: hidden;
  overflow-y: auto;
  padding: max(1rem, env(safe-area-inset-top, 0px)) 1rem max(1rem, env(safe-area-inset-bottom, 0px));
  background: radial-gradient(circle at top, rgba(251, 191, 36, 0.16), transparent 28%),
    linear-gradient(180deg, #111827 0%, #0f172a 100%);
}

.signin-stage {
  display: flex;
  width: 100%;
  min-height: calc(100svh - max(2rem, env(safe-area-inset-top, 0px) + env(safe-area-inset-bottom, 0px)));
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0;
}

.signin-card {
  width: min(100%, 28rem);
  margin: auto;
  border-radius: 1.9rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: linear-gradient(180deg, rgba(40, 49, 68, 0.96), rgba(28, 35, 50, 0.96)),
    linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
  padding: clamp(1.15rem, 2vw, 1.75rem);
  box-shadow: 0 30px 80px rgba(15, 23, 42, 0.48);
  backdrop-filter: blur(18px);
}

.signin-title {
  margin: 0 0 1.1rem;
  text-align: center;
  font-size: clamp(1.55rem, 4vw, 2rem);
  line-height: 1.12;
  font-weight: 900;
  color: #fff;
}

.feedback-banner {
  margin: 0 0 0.95rem;
  border-radius: 1rem;
  padding: 0.75rem 0.9rem;
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.45;
}

.feedback-banner-info {
  border: 1px solid rgba(96, 165, 250, 0.24);
  background: rgba(37, 99, 235, 0.14);
  color: rgba(219, 234, 254, 0.96);
}

.feedback-banner-error {
  border: 1px solid rgba(251, 113, 133, 0.24);
  background: rgba(190, 24, 93, 0.16);
  color: rgba(255, 228, 230, 0.98);
}

.signin-form {
  display: grid;
  gap: 0.9rem;
}

.field {
  display: flex;
  flex-direction: column;
}

.field label {
  margin-bottom: 0.4rem;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(241, 245, 249, 0.95);
}

.input-shell {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 0.95rem;
  top: 50%;
  display: inline-flex;
  height: 1rem;
  width: 1rem;
  align-items: center;
  justify-content: center;
  color: rgba(100, 116, 139, 0.95);
  transform: translateY(-50%);
  pointer-events: none;
}

.input-icon svg {
  height: 100%;
  width: 100%;
}

.input-field {
  width: 100%;
  min-height: 3.2rem;
  border-radius: 1rem;
  border: 1px solid rgba(148, 163, 184, 0.26);
  background: rgba(248, 250, 252, 0.98);
  padding: 0.88rem 1rem 0.88rem 2.8rem;
  font-size: 0.94rem;
  font-weight: 500;
  color: #0f172a;
  outline: none;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.input-field::placeholder {
  color: rgba(100, 116, 139, 0.82);
}

.input-field:focus {
  border-color: rgba(251, 191, 36, 0.9);
  background: #fff;
  box-shadow: 0 0 0 4px rgba(251, 191, 36, 0.16);
  transform: translateY(-1px);
}

.submit-button {
  width: 100%;
  border-radius: 999px;
  background: linear-gradient(180deg, #f8cc45 0%, #f5b93f 100%);
  padding: 0.95rem 1rem;
  font-size: 0.96rem;
  font-weight: 800;
  color: #0f172a;
  box-shadow: 0 16px 32px rgba(245, 185, 63, 0.26);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    opacity 0.2s ease;
}

.submit-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 18px 36px rgba(245, 185, 63, 0.3);
}

.submit-button:disabled {
  cursor: not-allowed;
  opacity: 0.72;
  transform: none;
}

.social-stack {
  display: grid;
  gap: 0.7rem;
}

.social-divider {
  position: relative;
  margin: 0.95rem 0;
  text-align: center;
}

.social-divider::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.social-divider span {
  position: relative;
  display: inline-block;
  padding: 0 0.85rem;
  background: linear-gradient(180deg, rgba(33, 41, 58, 0.95), rgba(37, 45, 63, 0.95));
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(226, 232, 240, 0.78);
}

.social-button {
  display: inline-flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  padding: 0.82rem 1rem;
  font-size: 0.92rem;
  font-weight: 700;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease,
    opacity 0.2s ease;
}

.social-button:hover {
  transform: translateY(-1px);
}

.social-button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
  transform: none;
}

.social-button-google {
  background: rgba(255, 255, 255, 0.96);
  color: #0f172a;
}

.social-button-google:hover {
  background: #fff;
  border-color: rgba(255, 255, 255, 0.45);
}

.social-button-apple {
  background: rgba(15, 23, 42, 0.72);
  color: #fff;
}

.social-button-apple:hover {
  background: rgba(15, 23, 42, 0.9);
  border-color: rgba(255, 255, 255, 0.22);
}

.social-icon {
  display: inline-flex;
  height: 1.2rem;
  width: 1.2rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
}

.social-icon svg {
  height: 100%;
  width: 100%;
}

.auth-switch {
  margin: 0.95rem 0 0;
  text-align: center;
  font-size: 0.88rem;
  color: rgba(226, 232, 240, 0.74);
}

.auth-switch-link {
  font-weight: 700;
  color: #f8cc45;
}

.auth-switch-link:hover {
  color: #fbe38b;
}

@media (min-width: 640px) {
  .signin-shell {
    padding: 1.4rem;
  }
}

@media (max-width: 480px) {
  .signin-shell {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  .signin-stage {
    align-items: flex-start;
  }

  .signin-card {
    border-radius: 1.55rem;
    padding: 1rem;
  }

  .signin-title {
    font-size: 1.45rem;
  }
}

@media (max-height: 760px) {
  .signin-stage {
    align-items: flex-start;
  }

  .signin-shell {
    padding-top: max(0.75rem, env(safe-area-inset-top, 0px));
    padding-bottom: max(0.75rem, env(safe-area-inset-bottom, 0px));
  }
}
</style>
