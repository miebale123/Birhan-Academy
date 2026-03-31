<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/features/auth/stores/auth.store'

const authStore = useAuthStore()
const { currentUser } = storeToRefs(authStore)

const footerGroups = computed(() => {
  const accountLinks = currentUser.value
    ? [
        { label: 'My learning', to: { name: 'learningDashboard' } },
        { label: 'Browse courses', to: { name: 'courseCatalog' } },
      ]
    : [
        { label: 'Sign in', to: { name: 'signIn' } },
        { label: 'Create account', to: { name: 'signUp' } },
      ]

  return [
    {
      title: 'Company',
      links: [
        { label: 'About us', to: { name: 'about' } },
        { label: 'Courses', to: { name: 'courseCatalog' } },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Support', to: { name: 'support' } },
        { label: 'Home', to: { name: 'home' } },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', to: { name: 'privacyPolicy' } },
        { label: 'Terms of Service', to: { name: 'termsOfService' } },
      ],
    },
    {
      title: 'Account',
      links: accountLinks,
    },
  ]
})

const bottomLinks = [
  { label: 'About', to: { name: 'about' } },
  { label: 'Support', to: { name: 'support' } },
  { label: 'Privacy Policy', to: { name: 'privacyPolicy' } },
  { label: 'Terms of Service', to: { name: 'termsOfService' } },
]

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer border-t border-white/10 text-white">
    <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div class="grid gap-10 border-b border-white/10 pb-8 lg:grid-cols-[1.2fr_1.8fr] lg:gap-14">
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
              <p class="mt-1 text-sm text-slate-300/80">
                Clear learning journeys for students and families.
              </p>
            </div>
          </RouterLink>

          <p class="max-w-md text-sm leading-7 text-slate-300/84">
            Explore courses, manage account access, and find support through a cleaner digital
            learning experience built for everyday use.
          </p>
        </div>

        <div class="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          <nav v-for="group in footerGroups" :key="group.title" :aria-label="group.title">
            <p class="footer-heading">{{ group.title }}</p>
            <ul class="mt-4 space-y-3">
              <li v-for="link in group.links" :key="link.label">
                <RouterLink :to="link.to" class="footer-link">
                  {{ link.label }}
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div class="flex flex-col gap-4 pt-5 text-sm text-slate-400 lg:flex-row lg:items-center lg:justify-between">
        <p>&copy; {{ currentYear }} Birhan Academy. All rights reserved.</p>

        <div class="flex flex-wrap gap-x-4 gap-y-2">
          <RouterLink
            v-for="link in bottomLinks"
            :key="link.label"
            :to="link.to"
            class="footer-meta-link"
          >
            {{ link.label }}
          </RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background:
    radial-gradient(circle at top left, rgba(245, 158, 11, 0.1), transparent 24%),
    radial-gradient(circle at 85% 10%, rgba(56, 189, 248, 0.12), transparent 22%),
    linear-gradient(180deg, rgba(2, 6, 23, 0.98) 0%, rgba(3, 7, 18, 1) 100%);
}

.footer-heading {
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(191, 219, 254, 0.8);
}

.footer-link,
.footer-meta-link {
  color: rgba(226, 232, 240, 0.84);
  transition: color 160ms ease;
}

.footer-link {
  font-size: 0.95rem;
  font-weight: 600;
}

.footer-link:hover,
.footer-meta-link:hover {
  color: white;
}

.footer-meta-link {
  font-size: 0.88rem;
}
</style>
