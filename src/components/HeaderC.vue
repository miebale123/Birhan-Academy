<template>
  <div class="p-8 fixed w-full">
    <div class="flex items-center justify-center gap-16 text-sm">
      <router-link to="/" class="flex justify-center items-center space-x-8">
        <h2 class="text-indigo-500 text-lg">Light Academy</h2>
      </router-link>

      <div class="hidden sm:flex items-center space-x-8">
        <router-link to="/" class="text-blue-500">Home</router-link>
        <router-link to="/Courses">
          <span class="absolute ml-12">
            <span class="absolute animate-ping rounded-full size-2 bg-sky-400"></span>
            <span class="absolute size-2 rounded-full bg-sky-500"></span>
          </span>
          <button class="bg-amber-200 p-1 rounded text-purple-500">Courses</button>
        </router-link>
      </div>

      <search :items="courses" @courseSearched="courseSearched" />

      <div class="flex items-center gap-2 sm:gap-4 pr-16">
        <router-link to="/SignUp" class="text-white text-xl rounded-md animate-bounce">
          Sign Up</router-link
        >
      </div>
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
