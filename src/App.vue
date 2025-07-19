<script setup>
import AppHeader from './components/AppHeader.vue'
import { RouterView } from 'vue-router'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <AppHeader />
  <router-view />
  <AppFooter />
</template>
  