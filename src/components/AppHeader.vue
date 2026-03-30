<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="w-full bg-black/95 px-4 py-3 backdrop-blur">
    <div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
      <router-link to="/" class="text-center text-xl font-bold text-indigo-400">
        Light Academy
      </router-link>

      <nav class="flex flex-wrap items-center justify-center gap-3 text-sm sm:gap-6 sm:text-base">
        <router-link to="/" class="text-blue-400 hover:underline">Home</router-link>
        <router-link to="/Courses" class="text-violet-400 hover:underline">Courses</router-link>
        <router-link to="/Sign Up" class="text-green-400 hover:underline">Sign Up</router-link>
      </nav>
    </div>
  </header>
</template>
