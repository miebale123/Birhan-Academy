<template>
  <header
    class="p-4 w-full bg-black z-50 fixed flex flex-wrap items-center justify-center gap-2 sm:gap-16"
  >
    <router-link to="/" class="text-indigo-500">Light Academy</router-link>

    <nav class="flex gap-8">
      <router-link to="/" class="text-blue-500">Home</router-link>
      <router-link to="/Courses" class="text-purple-500">Courses</router-link>
      <router-link to="/Courses" class="text-white animate-bounce">Sign Up</router-link>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
