<script setup>
import AppHeader from './components/AppHeader.vue'
import { RouterView } from 'vue-router'
// import footerC from './components/footerC.vue'
</script>

<template>
  <AppHeader />
  <router-view></router-view>
  <!-- <footerC /> -->
</template>
