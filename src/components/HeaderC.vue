<template>
  <div
    class="flex items-center justify-center gap-16 bg-gradient-to-r from-green-200 to-green-300 text-sm p-3 w-full"
  >
    <router-link to="/" class="flex justify-center items-center space-x-8">
      <img src="./Icons/graduate.svg" alt="Graduate Logo" class="sm:w-10 md:w-12 lg:w-14 ml-40" />
      <h2 class="text-indigo-500 text-lg">Birhan Academy</h2>
    </router-link>

    <div class="hidden sm:flex items-center space-x-8">
      <router-link to="/" class="text-blue-700 underline">Home</router-link>
      <router-link to="/Courses">
        <span class="absolute ml-12">
          <span class="absolute animate-ping rounded-full size-3 bg-sky-400"></span>
          <span class="absolute size-3 rounded-full bg-sky-500"></span>
        </span>
        <button class="bg-amber-200 p-1 rounded text-purple-500">courses</button>
      </router-link>
    </div>

    <router-link to="/Notes" class="p-1 bg-red-100 rounded-md hover:bg-red-200 text-gray-400">tasks and notes</router-link>

    <search :items="courses" @courseSearched="courseSearched" />

    <div class="flex items-center gap-2 sm:gap-4 pr-16">
      <!-- <router-link
        to="/Login"
        class="border border-red-200 p-2 pr-3 pl-3 rounded-lg text-purple-500"
        >log in</router-link
      > -->

      <router-link
        to="/SignUp"
        class="p-2 bg-blue-400 text-white rounded-md hover:bg-blue-600 animate-bounce"
      >
        Sign Up</router-link
      >
    </div>
  </div>
</template>

<script>
import search from '@/components/Atoms/search.vue'
import { RouterLink } from 'vue-router'

export default {
  components: { search, RouterLink },
  data() {
    return {
      courses: [],
    }
  },
  methods: {
    courseSearched(course) {
      console.log(`Searched course: ${course}`)
    },
  },
}
</script>
