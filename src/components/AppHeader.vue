<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header
    class="fixed top-0 left-0 w-full bg-black p-6 sm:p-8 z-50 flex flex-wrap items-center justify-between"
  >
    <router-link to="/" class="text-indigo-500 text-xl font-bold"> Light Academy </router-link>

    <nav class="flex gap-6 sm:gap-8">
      <router-link to="/" class="text-blue-500 hover:underline">Home</router-link>
      <router-link to="/Courses" class="text-purple-500 hover:underline">Courses</router-link>
      <router-link to="/SignUp" class="text-white animate-bounce font-semibold">
        Sign Up
      </router-link>
    </nav>
  </header>


</template>
