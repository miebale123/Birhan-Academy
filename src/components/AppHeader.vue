<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="w-full bg-black flex items-center justify-around p-2">
    <router-link to="/" class="text-indigo-500 text-xl font-bold"> Light Academy </router-link>

    <nav class="flex gap-8">
      <router-link to="/" class="text-blue-500 hover:underline">Home</router-link>
      <router-link to="/Courses" class="text-purple-500 hover:underline">Courses</router-link>
      <router-link to="/Sign Up" class="text-green-500 hover:underline">Sign Up</router-link>
    </nav>
  </header>
</template>
