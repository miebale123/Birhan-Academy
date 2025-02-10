<template>
  <div class="grid grid-cols-4 gap-8 p-1 " :key="colorKey">
    <span v-for="(course, courseIndex) in courses" :key="courseIndex">
      <course>
        <h2
          :style="{
            background: currentColor,
            color: `white`,
            animationDelay: `${courseIndex * 0.25}s`,
          }"
           class="animate-fade-in p-2"
        >
          {{ course }}
        </h2>
        <template #calendar>{{ calendar[courseIndex] }}</template>
        <template #instructor>{{ instructor[courseIndex] }}</template>
        <p class="break-words whitespace-normal text-indigo-900">{{ descriptions[courseIndex] }}</p>
      </course>
    </span>
  </div>
</template>

<script>
import course from '@/components/Atoms/course.vue'

export default {
  components: { course },
  data() {
    return {
      courses: ['python', 'javascript', 'networking', 'machine-learning', 'graphics', 'web-development', 'data-science', 'cyber-security', 'blockchain', 'iot'],
      calendar: ['30min', '1hour', '30days'],
      instructor: ['Simon', 'David', 'Peter', ],
      descriptions: ['lorem epsum', 'lorem epsum', 'lorem epsum', 'lorem epsum','lorem epsum'],
      colors: ['purple', 'green'], // Array of colors
      colorIndex: 0,
      course,
      currentCourse: '',
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
