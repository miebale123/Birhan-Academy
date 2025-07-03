<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="fixed top-0 left-0 w-full bg-black p-6 z-50 flex items-center justify-around">
    <router-link to="/" class="text-indigo-500 text-xl font-bold"> Light Sales </router-link>

    <nav class="flex gap-8">
      <router-link to="/" class="text-blue-500 hover:underline">Home</router-link>
      <router-link to="/Courses" class="text-purple-500 hover:underline">Sales</router-link>
    </nav>
  </header>
</template>
