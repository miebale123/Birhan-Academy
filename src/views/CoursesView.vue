<template>
  <div class="grid grid-cols-3 gap-8 p-32 bg-indigo-950" :key="colorKey">
    <course v-for="(course, index) in courses" :key="index">
      <button
        :style="{ background: currentColor, animationDelay: `${index * 0.25}s` }"
        class="animate-fade-in px-1 text-white"
      >
        {{ course }}
      </button>
      <img :src="images[index]" class="h-80 w-[700px]" />
    </course>
  </div>
</template>

<script>
import water from '@/assets/water.jpg'

export default {
  data() {
    return {
      courses: ['water', 'water', 'water', 'water', 'water'],
      colors: ['purple', 'black', 'green'],
      colorIndex: 0,
      images: [water, water, water, water, water],
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
