<script setup>
import AppHeader from './components/AppHeader.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <AppHeader />
    <router-view></router-view>
  </div>
</template>
