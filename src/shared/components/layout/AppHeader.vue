<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/features/auth/stores/auth.store'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const isMobileMenuOpen = ref(false)
const isUserMenuOpen = ref(false)
const userMenuRef = ref(null)
const { currentUser } = storeToRefs(authStore)
let desktopViewportQuery

const navigationItems = computed(() => {
  const items = [
    { label: 'Home', name: 'home' },
    { label: 'Courses', name: 'courseCatalog' },
  ]

  if (currentUser.value) {
    items.splice(1, 0, { label: 'My Learning', name: 'learningDashboard' })
  }

  return items
})

const mobileMenuLabel = computed(() => {
  return isMobileMenuOpen.value ? 'Close navigation menu' : 'Open navigation menu'
})

const currentUserFirstName = computed(() => {
  return authStore.firstName
})

const currentUserInitial = computed(() => {
  return authStore.userInitial
})

watch(
  () => route.fullPath,
  () => {
    isMobileMenuOpen.value = false
    isUserMenuOpen.value = false
  },
)

watch(isMobileMenuOpen, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

onMounted(() => {
  desktopViewportQuery = window.matchMedia('(min-width: 640px)')
  desktopViewportQuery.addEventListener('change', handleDesktopViewport)
  document.addEventListener('pointerdown', handlePointerDown)
})

onBeforeUnmount(() => {
  desktopViewportQuery?.removeEventListener('change', handleDesktopViewport)
  document.removeEventListener('pointerdown', handlePointerDown)
  document.body.style.overflow = ''
})

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

function handleDesktopViewport(event) {
  if (event.matches) {
    closeMobileMenu()
  }
}

function toggleUserMenu() {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

function closeUserMenu() {
  isUserMenuOpen.value = false
}

function handlePointerDown(event) {
  if (!isUserMenuOpen.value) {
    return
  }

  if (!userMenuRef.value?.contains(event.target)) {
    closeUserMenu()
  }
}

async function handleLogout() {
  authStore.signOut()
  isMobileMenuOpen.value = false
  closeUserMenu()
  await router.push({ name: 'signIn' })
}
</script>

<template>
  <header
    class="app-header fixed inset-x-0 top-0 z-[60] w-full border-b border-white/10 bg-slate-950/85 text-white backdrop-blur-xl"
  >
    <div
      class="mx-auto flex min-h-[var(--app-header-height)] w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
    >
      <div class="flex min-w-0 items-center gap-2 sm:gap-3">
        <RouterLink
          :to="{ name: 'home' }"
          class="flex min-w-0 items-center gap-2 py-3 transition-opacity hover:opacity-90 sm:gap-3"
        >
          <div
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-lg font-black text-slate-950 shadow-[0_8px_16px_rgba(245,158,11,0.25)]"
          >
            B
          </div>
          <div class="hidden min-w-0 sm:block">
            <span
              class="block truncate text-sm font-black uppercase tracking-[0.28em] text-white sm:text-base"
            >
              Birhan Academy
            </span>
          </div>
        </RouterLink>
      </div>

      <div class="flex shrink-0 items-center gap-2 sm:gap-3">
        <nav
          class="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 p-1 sm:flex"
        >
          <RouterLink
            v-for="item in navigationItems"
            :key="item.name"
            :to="{ name: item.name }"
            :class="[
              'rounded-full px-4 py-1.5 text-sm font-semibold transition-colors sm:text-base',
              route.name === item.name
                ? 'bg-amber-400/15 text-amber-400 shadow-[inset_0_1px_0_rgba(251,191,36,0.2)]'
                : 'text-slate-200 hover:bg-slate-800/60 hover:text-white',
            ]"
          >
            {{ item.label }}
          </RouterLink>
        </nav>

        <RouterLink
          v-if="!currentUser"
          :to="{ name: 'signIn' }"
          class="hidden shrink-0 rounded-full bg-amber-400 px-3 py-2 text-sm font-bold text-slate-950 shadow-[0_12px_24px_rgba(245,158,11,0.22)] transition-all hover:bg-amber-300 sm:inline-flex sm:px-5"
        >
          Sign in
        </RouterLink>

        <div v-else ref="userMenuRef" class="user-menu-wrapper relative hidden shrink-0 sm:block">
          <button
            type="button"
            class="user-menu-trigger !p-1 sm:!p-[0.45rem_0.8rem_0.45rem_0.45rem]"
            @click="toggleUserMenu"
          >
            <span class="user-avatar shrink-0">{{ currentUserInitial }}</span>
            <span class="user-name hidden sm:block">{{ currentUserFirstName }}</span>
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              :class="[
                'user-menu-chevron shrink-0',
                isUserMenuOpen ? 'user-menu-chevron-open' : '',
              ]"
            >
              <path d="m5 8 5 5 5-5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          <transition name="user-menu">
            <div v-if="isUserMenuOpen" class="user-dropdown" role="menu">
              <div class="user-dropdown-header">
                <p class="user-dropdown-name">{{ currentUser?.name }}</p>
                <p class="user-dropdown-email">{{ currentUser?.email }}</p>
              </div>
              <button type="button" class="user-dropdown-action" @click="handleLogout">
                Log out
              </button>
            </div>
          </transition>
        </div>

        <button
          type="button"
          class="mobile-menu-toggle flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 sm:hidden"
          :aria-expanded="isMobileMenuOpen"
          :aria-label="mobileMenuLabel"
          @click="toggleMobileMenu"
        >
          <span class="relative block h-4 w-5">
            <span
              :class="isMobileMenuOpen ? 'translate-y-[7px] rotate-45' : 'translate-y-0'"
              class="absolute left-0 top-0 h-0.5 w-full rounded-full bg-current transition duration-200"
            ></span>
            <span
              :class="isMobileMenuOpen ? 'opacity-0' : 'opacity-100'"
              class="absolute left-0 top-[7px] h-0.5 w-full rounded-full bg-current transition duration-200"
            ></span>
            <span
              :class="isMobileMenuOpen ? '-translate-y-[7px] -rotate-45' : 'translate-y-0'"
              class="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-current transition duration-200"
            ></span>
          </span>
        </button>
      </div>
    </div>

    <transition name="mobile-menu">
      <div
        v-if="isMobileMenuOpen"
        class="mobile-menu-shell sm:hidden"
        @click.self="closeMobileMenu"
      >
        <div class="mobile-menu-panel">
          <div class="mobile-menu-panel-header">
            <div>
              <p class="mobile-menu-eyebrow">Navigation</p>
              <p class="mobile-menu-title">
                {{ currentUser ? 'Your learning menu' : 'Browse the academy' }}
              </p>
            </div>
            <button
              type="button"
              class="mobile-menu-close"
              aria-label="Close navigation menu"
              @click="closeMobileMenu"
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M5 5 15 15M15 5 5 15" stroke-linecap="round" />
              </svg>
            </button>
          </div>

          <div class="mobile-menu-links">
            <RouterLink
              v-for="item in navigationItems"
              :key="item.name"
              :to="{ name: item.name }"
              :class="[
                'mobile-menu-link',
                route.name === item.name ? 'mobile-menu-link-active' : '',
              ]"
            >
              {{ item.label }}
            </RouterLink>
          </div>

          <div v-if="currentUser" class="mobile-account-card">
            <p class="mobile-account-name">{{ currentUser.name }}</p>
            <p class="mobile-account-email">{{ currentUser.email }}</p>
            <button type="button" class="mobile-account-action" @click="handleLogout">
              Log out
            </button>
          </div>

          <div v-else class="mobile-auth-actions">
            <RouterLink :to="{ name: 'signIn' }" class="mobile-auth-primary">
              Sign in
            </RouterLink>
            <RouterLink :to="{ name: 'signUp' }" class="mobile-auth-secondary">
              Create account
            </RouterLink>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.app-header {
  padding-top: env(safe-area-inset-top, 0px);
}

.mobile-menu-toggle {
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.18);
}

.user-menu-wrapper {
  position: relative;
}

.user-menu-trigger {
  display: inline-flex;
  max-width: 13rem;
  align-items: center;
  gap: 0.75rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.06);
  padding: 0.45rem 0.8rem 0.45rem 0.45rem;
  color: inherit;
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.18);
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.user-menu-trigger:hover {
  border-color: rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.08);
}

.user-avatar {
  display: inline-flex;
  height: 2.2rem;
  width: 2.2rem;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: linear-gradient(180deg, #f8cc45 0%, #f59e0b 100%);
  color: #0f172a;
  font-size: 0.95rem;
  font-weight: 900;
  box-shadow: 0 10px 22px rgba(245, 158, 11, 0.2);
}

.user-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 700;
}

.user-email {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.78rem;
  color: rgba(203, 213, 225, 0.72);
}

.user-menu-chevron {
  height: 1rem;
  width: 1rem;
  flex-shrink: 0;
  opacity: 0.8;
  transition: transform 0.2s ease;
}

.user-menu-chevron-open {
  transform: rotate(180deg);
}

.user-dropdown {
  position: absolute;
  right: 0;
  top: calc(100% + 0.7rem);
  min-width: 15rem;
  width: min(15rem, calc(100vw - 1.5rem));
  max-width: calc(100vw - 1.5rem);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(15, 23, 42, 0.98);
  padding: 0.45rem;
  box-shadow: 0 18px 42px rgba(2, 6, 23, 0.42);
}

.user-dropdown-header {
  padding: 0.45rem 0.6rem 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.user-dropdown-name {
  margin: 0;
  font-size: 0.92rem;
  font-weight: 700;
  color: #fff;
}

.user-dropdown-email {
  margin: 0.2rem 0 0;
  font-size: 0.8rem;
  line-height: 1.45;
  color: rgba(203, 213, 225, 0.72);
}

.user-dropdown-action {
  width: 100%;
  border-radius: 0.85rem;
  padding: 0.75rem 0.8rem;
  text-align: left;
  font-size: 0.9rem;
  font-weight: 700;
  color: #fca5a5;
  transition: background-color 0.2s ease;
}

.user-dropdown-action:hover {
  background: rgba(248, 113, 113, 0.1);
}

.user-menu-enter-active,
.user-menu-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.user-menu-enter-from,
.user-menu-leave-to {
  opacity: 0;
  transform: translateY(-0.35rem);
}

.mobile-menu-shell {
  position: fixed;
  inset: 0;
  z-index: 55;
  display: flex;
  justify-content: flex-end;
  padding: calc(var(--app-header-height) + env(safe-area-inset-top, 0px) + 0.5rem) 0.75rem
    max(0.75rem, env(safe-area-inset-bottom, 0px));
  background: rgba(2, 6, 23, 0.56);
  backdrop-filter: blur(8px);
}

.mobile-menu-panel {
  width: min(22rem, 100%);
  max-height: calc(100dvh - var(--app-header-height) - env(safe-area-inset-top, 0px) - 1.25rem);
  overflow-y: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.6rem;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(8, 15, 29, 0.98));
  padding: 1rem;
  box-shadow: 0 24px 60px rgba(2, 6, 23, 0.45);
}

.mobile-menu-panel-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
}

.mobile-menu-eyebrow {
  margin: 0;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(251, 191, 36, 0.86);
}

.mobile-menu-title {
  margin: 0.45rem 0 0;
  font-size: 1.15rem;
  font-weight: 800;
  line-height: 1.3;
  color: white;
}

.mobile-menu-close {
  display: inline-flex;
  height: 2.4rem;
  width: 2.4rem;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(226, 232, 240, 0.9);
}

.mobile-menu-close svg {
  height: 1rem;
  width: 1rem;
}

.mobile-menu-links,
.mobile-auth-actions {
  display: grid;
  gap: 0.7rem;
  margin-top: 1rem;
}

.mobile-menu-link,
.mobile-auth-primary,
.mobile-auth-secondary,
.mobile-account-action {
  display: inline-flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  padding: 0.95rem 1rem;
  font-size: 0.95rem;
  font-weight: 700;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease;
}

.mobile-menu-link {
  justify-content: flex-start;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(241, 245, 249, 0.96);
}

.mobile-menu-link-active {
  border-color: rgba(251, 191, 36, 0.32);
  background: rgba(251, 191, 36, 0.12);
  color: rgba(251, 191, 36, 0.98);
}

.mobile-account-card {
  margin-top: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.2rem;
  background: rgba(255, 255, 255, 0.04);
  padding: 1rem;
}

.mobile-account-name {
  margin: 0;
  font-size: 1rem;
  font-weight: 800;
  color: white;
}

.mobile-account-email {
  margin: 0.35rem 0 0;
  font-size: 0.85rem;
  line-height: 1.5;
  color: rgba(203, 213, 225, 0.76);
}

.mobile-account-action {
  margin-top: 1rem;
  border: 1px solid rgba(248, 113, 113, 0.2);
  background: rgba(248, 113, 113, 0.08);
  color: #fca5a5;
}

.mobile-auth-primary {
  background: linear-gradient(180deg, #f8cc45 0%, #f5b93f 100%);
  color: #0f172a;
  box-shadow: 0 16px 32px rgba(245, 185, 63, 0.26);
}

.mobile-auth-secondary {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.22s ease;
}

.mobile-menu-enter-active .mobile-menu-panel,
.mobile-menu-leave-active .mobile-menu-panel {
  transition: transform 0.24s ease, opacity 0.24s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}

.mobile-menu-enter-from .mobile-menu-panel,
.mobile-menu-leave-to .mobile-menu-panel {
  opacity: 0;
  transform: translateX(1.2rem);
}
</style>
