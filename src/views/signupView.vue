<template>
  <section class="signup-shell">
    <div
      class="mx-auto grid min-h-[calc(100vh-9rem)] w-full max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(340px,460px)] lg:px-8 lg:py-14"
    >
      <div class="signup-hero order-2 flex flex-col gap-5 text-center lg:order-1 lg:text-left">
        <p class="signup-eyebrow">Join Birhan Academy</p>
        <h1 class="text-4xl font-black leading-tight text-white sm:text-5xl">
          Sign up with a form that works comfortably on mobile too
        </h1>
        <p class="text-sm leading-7 text-slate-200/80 sm:text-base">
          Create an account to follow courses, track progress, and keep learning from any device.
        </p>

        <div class="hero-image-frame">
          <img :src="readingImage" alt="Student reading and learning" class="h-full w-full object-cover" />
        </div>
      </div>

      <div class="order-1 rounded-[1.75rem] border border-white/10 bg-white/10 p-5 shadow-[0_26px_70px_rgba(15,23,42,0.45)] backdrop-blur md:p-7 lg:order-2">
        <h2 class="mb-2 text-center text-2xl font-bold text-white">Sign up</h2>
        <p class="mb-6 text-center text-sm text-slate-200/75">
          Fill in your details below to create your account.
        </p>

        <form @submit.prevent="handleSignup" class="space-y-4">
          <div class="field">
            <label for="name">Full Name</label>
            <input
              type="text"
              id="name"
              v-model="infoData.name"
              required
              class="input-field"
            />
          </div>

          <div class="field">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="infoData.email"
              required
              class="input-field"
            />
          </div>

          <div class="field">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="infoData.password"
              required
              class="input-field"
            />
          </div>

          <div class="field">
            <label for="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              v-model="infoData.passwordConfirm"
              required
              class="input-field"
            />
          </div>

          <div class="flex items-start gap-3 rounded-2xl bg-white/6 p-3 text-sm text-slate-100">
            <input
              type="checkbox"
              id="agreement"
              v-model="agreement"
              required
              class="mt-1 h-4 w-4 shrink-0 rounded border-white/30 bg-transparent"
            />
            <label for="agreement">I agree to the terms and conditions.</label>
          </div>

          <button
            type="submit"
            class="w-full rounded-full bg-amber-300 px-4 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import readingImage from '../assets/reading.avif'

export default {
  data() {
    return {
      readingImage,
      infoData: {
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
      },
      agreement: false,
    }
  },
  methods: {
    async handleSignup() {
      if (!this.agreement) {
        alert('Please agree to the terms and conditions.')
        return
      }
      if (this.infoData.password !== this.infoData.passwordConfirm) {
        alert('Passwords do not match.')
        return
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(this.infoData.email)) {
        alert('Please enter a valid email address.')
        return
      }
      const userData = { ...this.infoData, userType: 'freelancer' }
      try {
        const response = await fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        })
        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.message || `HTTP error! status: ${response.status}`)
        }
        alert('Freelancer registered successfully!')
        this.infoData = { name: '', email: '', password: '', passwordConfirm: '' }
        this.agreement = false
      } catch (error) {
        console.error('Registration error:', error)
        alert(`Error: ${error.message}`)
      }
    },
  },
}
</script>
<style scoped>
.signup-shell {
  background:
    radial-gradient(circle at top, rgba(251, 191, 36, 0.18), transparent 28%),
    linear-gradient(180deg, #111827 0%, #0f172a 100%);
}

.signup-hero {
  color: white;
}

.signup-eyebrow {
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(251, 191, 36, 0.9);
}

.hero-image-frame {
  overflow: hidden;
  border-radius: 1.75rem;
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.38);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.field label {
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(241, 245, 249, 0.95);
}

.input-field {
  width: 100%;
  border-radius: 1rem;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: rgba(255, 255, 255, 0.92);
  padding: 0.8rem 0.95rem;
  color: #0f172a;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.input-field:focus {
  border-color: rgba(251, 191, 36, 0.9);
  box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.18);
}
</style>
