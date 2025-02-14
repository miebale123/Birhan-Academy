<template>
  <div class="grid grid-cols-3 gap-8 p-4" :key="colorKey">
    <course
      v-for="(course, index) in courses"
      :key="index"
      :style="{ background: `url(${images[index]})` }"
      class="rounded-xl"
    >
      <router-link
        to="/Contents"
        :style="{
          background: currentColor,
          animationDelay: `${index * 0.25}s`,
        }"
        class="animate-fade-in pr-16 pl-16 p-1 justify-center rounded-xl opacity-20 text-white"
      >
        {{ course }}
      </router-link>
    </course>
  </div>
</template>

<script>
import course from '@/components/Atoms/course.vue'
import biology from '@/assets/biology.avif'
import soccer from '@/assets/soccer.jpg'
import geography from '@/assets/geography.jpg'
import watermelon from '@/assets/watermelon.jpg'
import math from '@/assets/math.jpg'
export default {
  components: { course },
  data() {
    return {
      courses: ['Food science', 'Geography', 'Math', 'Biology', 'Sport'],
      grade: ['grade five', 'grade two', 'grade three', 'grade seven', 'grade five'],
      colors: ['purple', 'black', 'green'],
      colorIndex: 0,
      course,
      images: [watermelon, geography, math, biology, soccer],
    }
  },

  computed: {
    currentColor() {
      return this.colors[this.colorIndex]
    },

    colorKey() {
      return `${this.colorIndex}`
    },
  },
  watch: {
    colorIndex(newValue) {
      if (newValue >= this.colors.length) {
        this.colorIndex = 0 // Reset to first color if we run out of colors
      }
    },
  },
  methods: {
    changeColor() {
      this.colorIndex++
    },
  },
  mounted() {
    setInterval(this.changeColor, 4000)
  },
}
</script>

<style>
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 0.25;
  }
  50%{
    opacity: 0.5;
  }
  75%{
    opacity: 0.75;
    background: #000;
  }

  100% {
    opacity: 1;
  }

}
  .animate-fade-in {
    animation: fade-in 1s ease-in-out forwards;
    opacity: 0;
  }
</style>
