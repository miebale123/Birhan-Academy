<template>
  <div class="grid grid-cols-3 gap-8 p-4" :key="colorKey">
    <course
      v-for="(course, courseIndex) in courses"
      :key="courseIndex"
      :style="{ background: `url(${courseImages[courseIndex]})` }"
      class="rounded-xl"
    >
      <router-link
        to="/Contents"
        :style="{
          background: currentColor,
          color: `white`,
          animationDelay: `${courseIndex * 0.25}s`,
        }"
        class="animate-fade-in pr-16 pl-16 p-1 justify-center rounded-xl"
      >
        {{ course }}
      </router-link>
      <template #calendar>{{ calendar[courseIndex] }}</template>
    </course>
  </div>
</template>

<script>
import course from '@/components/Atoms/course.vue'
import biology from '@/assets/biology.avif'
import soccer from '@/assets/soccer.jpg'
import geography from '@/assets/geography.jpg'
export default {
  components: { course },
  data() {
    return {
      courses: ['Food science', 'Geography', 'Math', 'Biology', 'Sport'],
      calendar: ['1 hour ago', '2 days ago', '2 months ago', '2days ago', 'a year ago'],
      // descriptions: ['lorem epsum', 'lorem epsum', 'lorem epsum', 'lorem epsum', 'lorem epsum'],
      grade: ['grade five', 'grade two', 'grade three', 'grade seven', 'grade five'],
      colors: ['purple', 'black'], // Array of colors
      colorIndex: 0,
      course,
      currentCourse: '',
      courseImages: ['', geography, '', biology, soccer],
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
  100% {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-in-out forwards;
  opacity: 0;
}
</style>
