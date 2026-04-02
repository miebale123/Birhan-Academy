<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useAuthStore } from '@/features/auth/stores/auth.store'
import AppFooter from '@/app/components/layout/AppFooter.vue'
import AppHeader from '@/app/components/layout/AppHeader.vue'

const route = useRoute()
const authStore = useAuthStore()

const showAppChrome = computed(() => !route.meta.hideChrome)

authStore.hydrate()
</script>

<template>
  <div class="min-h-screen">
    <AppHeader v-if="showAppChrome" />
    <div v-if="showAppChrome" aria-hidden="true" class="app-header-spacer"></div>
    <RouterView />
    <AppFooter v-if="showAppChrome" />
  </div>
</template>
