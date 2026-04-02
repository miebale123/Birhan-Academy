<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/features/auth/stores/auth.store'
import AppUserAvatar from '@/app/components/layout/AppUserAvatar.vue'
import UiButton from '@/shared/components/ui/UiButton.vue'

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

        <UiButton
          v-if="!currentUser"
          :to="{ name: 'signIn' }"
          class="hidden shrink-0 sm:inline-flex"
          size="sm"
          variant="primary"
        >
          Sign in
        </UiButton>

        <div v-else ref="userMenuRef" class="user-menu-wrapper relative hidden shrink-0 sm:block">
          <button
            type="button"
            class="user-menu-trigger !p-1 sm:!p-[0.45rem_0.8rem_0.45rem_0.45rem]"
            @click="toggleUserMenu"
          >
            <AppUserAvatar :name="currentUser?.name || currentUserInitial" class="shrink-0" />
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

        <UiButton
          type="button"
          class="mobile-menu-toggle sm:hidden"
          :aria-expanded="isMobileMenuOpen"
          :aria-label="mobileMenuLabel"
          icon-only
          variant="icon"
          @click="toggleMobileMenu"
        >
          <template #leading>
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
          </template>
        </UiButton>
      </div>
    </div>

    <transition name="mobile-nav">
      <div
        v-if="isMobileMenuOpen"
        class="mobile-nav-panel border-t border-white/10 bg-slate-950/98 shadow-[0_30px_70px_rgba(2,6,23,0.45)] sm:hidden"
      >
        <nav class="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-4">
          <RouterLink
            v-for="item in navigationItems"
            :key="item.name"
            :to="{ name: item.name }"
            class="mobile-nav-link"
            @click="closeMobileMenu"
          >
            {{ item.label }}
          </RouterLink>

          <template v-if="currentUser">
            <div class="mobile-user-panel">
              <p class="mobile-user-name">{{ currentUser.name }}</p>
              <p class="mobile-user-email">{{ currentUser.email }}</p>
            </div>
            <UiButton block variant="secondary" @click="handleLogout">Log out</UiButton>
          </template>

          <UiButton v-else :to="{ name: 'signIn' }" block variant="primary" @click="closeMobileMenu">
            Sign in
          </UiButton>
        </nav>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.user-menu-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  transition:
    background-color 160ms ease,
    border-color 160ms ease;
}

.user-menu-trigger:hover {
  border-color: rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.08);
}

.user-name {
  max-width: 8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.95rem;
  font-weight: 700;
}

.user-menu-chevron {
  width: 1rem;
  height: 1rem;
  transition: transform 160ms ease;
}

.user-menu-chevron-open {
  transform: rotate(180deg);
}

.user-dropdown {
  position: absolute;
  right: 0;
  top: calc(100% + 0.7rem);
  width: 15rem;
  overflow: hidden;
  border-radius: 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(2, 6, 23, 0.96);
  box-shadow: 0 26px 52px rgba(2, 6, 23, 0.45);
  backdrop-filter: blur(14px);
}

.user-dropdown-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1rem 1rem 0.85rem;
}

.user-dropdown-name {
  font-size: 0.95rem;
  font-weight: 800;
  color: white;
}

.user-dropdown-email {
  margin-top: 0.25rem;
  font-size: 0.82rem;
  color: rgba(226, 232, 240, 0.78);
}

.user-dropdown-action {
  width: 100%;
  padding: 0.9rem 1rem;
  text-align: left;
  font-size: 0.92rem;
  font-weight: 700;
  color: rgba(248, 250, 252, 0.92);
  transition: background-color 160ms ease;
}

.user-dropdown-action:hover {
  background: rgba(255, 255, 255, 0.06);
}

.mobile-nav-panel {
  min-height: calc(100dvh - var(--app-header-height));
}

.mobile-menu-toggle {
  display: inline-flex;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.04);
  padding: 0.95rem 1rem;
  font-size: 0.98rem;
  font-weight: 700;
  color: white;
}

.mobile-user-panel {
  border-radius: 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  padding: 1rem;
}

.mobile-user-name {
  font-size: 0.96rem;
  font-weight: 800;
  color: white;
}

.mobile-user-email {
  margin-top: 0.28rem;
  font-size: 0.84rem;
  color: rgba(226, 232, 240, 0.76);
}

.mobile-nav-enter-active,
.mobile-nav-leave-active,
.user-menu-enter-active,
.user-menu-leave-active {
  transition: all 180ms ease;
}

.mobile-nav-enter-from,
.mobile-nav-leave-to,
.user-menu-enter-from,
.user-menu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (min-width: 640px) {
  .mobile-menu-toggle {
    display: none !important;
  }
}
</style>
