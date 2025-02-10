<template>
  <div class="grid grid-cols-3 gap-8 p-4 " :key="colorKey">
    <span v-for="(course, courseIndex) in courses" :key="courseIndex">
      <course>
        <button
          :style="{
            background: currentColor,
            color: `white`,
            animationDelay: `${courseIndex * 0.25}s`,
          }"
           class="animate-fade-in pr-16 pl-16 p-1 justify-center rounded-xl"
        >
          {{ course }}
        </button>
        <template #calendar>{{ calendar[courseIndex] }}</template>
        <template #grade>{{ grade[courseIndex] }}</template>
        <p class="break-words whitespace-normal text-indigo-900 mt-8">{{ descriptions[courseIndex] }}</p>
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
      courses: ['food science', 'Geography', 'Math', 'Science', 'sport', ],
      calendar: ['1 hour ago', '2 days ago', '2 months ago'],
      descriptions: ['lorem epsum', 'lorem epsum', 'lorem epsum', 'lorem epsum','lorem epsum'],
      grade: ['grade five', 'grade two', 'grade three', 'grade seven', 'grade five'],
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
