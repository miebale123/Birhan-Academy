<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/features/auth/stores/auth.store'

const authStore = useAuthStore()
const { currentUser } = storeToRefs(authStore)

const exploreLinks = [
  { label: 'Home', to: { name: 'home' } },
  { label: 'Courses', to: { name: 'courseCatalog' } },
]

const platformItems = [
  'Structured lesson paths',
  'Simple enrollment flow',
  'Responsive layouts across devices',
]

const accountHeading = computed(() => {
  return currentUser.value ? 'Your account' : 'Get started'
})

const accountMessage = computed(() => {
  return currentUser.value
    ? `${currentUser.value.name} is signed in and ready to continue learning.`
    : 'Create an account or sign in to manage enrollments and course access.'
})

const accountLinks = computed(() => {
  if (currentUser.value) {
    return [
      { label: 'Browse courses', to: { name: 'courseCatalog' } },
      { label: 'Continue learning', to: { name: 'courseCatalog' } },
    ]
  }

  return [
    { label: 'Sign in', to: { name: 'signIn' } },
    { label: 'Create account', to: { name: 'signUp' } },
  ]
})

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer border-t border-white/10 text-white">
    <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div class="grid gap-10 md:grid-cols-2 xl:grid-cols-[1.4fr_0.75fr_0.95fr_1fr]">
        <div class="space-y-4">
          <RouterLink
            :to="{ name: 'home' }"
            class="inline-flex items-center gap-3 transition-opacity hover:opacity-90"
          >
            <div
              class="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-lg font-black text-slate-950 shadow-[0_10px_24px_rgba(245,158,11,0.24)]"
            >
              B
            </div>
            <div>
              <p class="text-xs font-black uppercase tracking-[0.28em] text-amber-300/85">
                Birhan Academy
              </p>
              <p class="mt-1 text-sm text-slate-300">Digital learning with a clear path forward.</p>
            </div>
          </RouterLink>

          <p class="max-w-md text-sm leading-7 text-slate-300/85">
            Explore courses, sign in securely, and move through each learning step with a
            cleaner experience on phones, tablets, and larger screens.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <p class="footer-heading">Explore</p>
          <ul class="mt-4 space-y-3">
            <li v-for="link in exploreLinks" :key="link.label">
              <RouterLink :to="link.to" class="footer-link">
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </nav>

        <div>
          <p class="footer-heading">{{ accountHeading }}</p>
          <p class="mt-4 max-w-xs text-sm leading-6 text-slate-400">
            {{ accountMessage }}
          </p>
          <ul class="mt-4 space-y-3">
            <li v-for="link in accountLinks" :key="link.label">
              <RouterLink :to="link.to" class="footer-link">
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <p class="footer-heading">Platform</p>
          <ul class="mt-4 space-y-3">
            <li
              v-for="item in platformItems"
              :key="item"
              class="flex items-start gap-3 text-sm leading-6 text-slate-300"
            >
              <span class="mt-2 h-2 w-2 rounded-full bg-amber-300"></span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 text-sm text-slate-400 md:flex-row md:items-center md:justify-between"
      >
        <p>&copy; {{ currentYear }} Birhan Academy. All rights reserved.</p>
        <p class="text-slate-300/85">
          {{
            currentUser
              ? `Signed in as ${currentUser.name}.`
              : 'Built for students, families, and educators.'
          }}
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background:
    radial-gradient(circle at top left, rgba(245, 158, 11, 0.12), transparent 26%),
    radial-gradient(circle at 85% 10%, rgba(56, 189, 248, 0.14), transparent 24%),
    linear-gradient(180deg, rgba(2, 6, 23, 0.98) 0%, rgba(3, 7, 18, 1) 100%);
}

.footer-heading {
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(191, 219, 254, 0.82);
}

.footer-link {
  color: rgba(226, 232, 240, 0.9);
  font-size: 0.95rem;
  font-weight: 600;
  transition:
    color 160ms ease,
    transform 160ms ease;
}

.footer-link:hover {
  color: white;
  transform: translateX(2px);
}
</style>
