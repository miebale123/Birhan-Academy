<script setup>
import { RouterLink } from 'vue-router'
import secure from '@/assets/secure.json'
import { Vue3Lottie } from 'vue3-lottie'
</script>

<template>
  <header class="w-full bg-black flex items-center justify-around">
    <router-link to="/" class="text-indigo-500 text-xl font-bold"> Light Sales </router-link>

    <nav class="flex gap-8">
      <router-link to="/" class="text-blue-500 hover:underline">Home</router-link>
      <router-link to="/Courses" class="text-purple-500 hover:underline">Sales</router-link>
    </nav>
  </header>

  <main>
    <div class="bg-black mt-20 h-screen">
      <div class="text-6xl bg-gradient-to-r via-yellow-300 absolute m-20">welcome!</div>
      <vue3-lottie :animationData="secure" />
    </div>
  </main>
</template>
