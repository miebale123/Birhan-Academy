<template>
  <div class="flex items-center space-x-16 bg-gradient-to-r from-blue-200 to-green-200 text-sm p-3">
    <router-link to="/" class="flex justify-center items-center space-x-8">
      <img src="./Icons/graduate.svg" alt="Graduate Logo" class="sm:w-10 md:w-12 lg:w-14 ml-40" />
      <h2 class="text-indigo-500 text-lg">birhan academy</h2>
    </router-link>

    <div class="hidden sm:flex items-center space-x-8 relative">
      <router-link to="/" class="text-blue-700 underline">home</router-link>
      <router-link to="/Courses">
        <span class="absolute ml-12">
          <span class="absolute animate-ping rounded-full size-3 bg-sky-400"></span>
          <span class="absolute size-3 rounded-full bg-sky-500"></span>
        </span>
        <button class="bg-amber-200 p-1 rounded text-purple-500">courses</button>
      </router-link>
    </div>

    <search :items="courses" @courseSearched="courseSearched" />

    <div class="flex items-center gap-2 sm:gap-4 pr-16">
      <!-- <router-link
        to="/login"
        class="border border-red-200 p-2 pr-3 pl-3 rounded-lg text-purple-500"
        >log in</router-link
      > -->
      <router-link
        to="/Signup"
        class="relative p-2 bg-blue-400 text-white rounded-md hover:bg-blue-600 animate-bounce"
      >
        sign up</router-link
      >
    </div>
  </div>
</template>

<script>
import search from '@/components/Atoms/search.vue'

export default {
  components: { search },
  data() {
    return {
      courses: ['introduction to python'], // i know i should emit the courses from coursesView to here but i might need help with that
    }
  },
  methods: {
    courseSearched(course) {
      console.log(`Searched course: ${course}`)
    },
  },
}
</script>
