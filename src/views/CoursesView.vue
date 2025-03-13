<template>
  <div class="grid grid-cols-3 gap-8 p-32 bg-indigo-950" :key="colorKey">
    <course v-for="(course, index) in courses" :key="index">
      <router-link
        to="/Contents"
        :style="{
          background: currentColor,
          animationDelay: `${index * 0.25}s`,
        }"
        class="animate-fade-in p-1 text-white"
      >
        {{ course }}
      </router-link>
      <img :src="images[index]" class="h-80 w-[700px] mt-1" />
    </course>
  </div>
</template>

<script>
import course from '@/components/Molecules/courseMolecule.vue'
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
      colors: ['purple', 'black', 'green'],
      colorIndex: 0,
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
    setInterval(this.changeColor, 3000)
  },
}
</script>

<style>
@keyframes fade-in {
  0% {
    opacity: 0;
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
