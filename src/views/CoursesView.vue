<template>
  <section class="courses-shell" :key="colorKey">
    <div class="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div class="max-w-3xl text-center sm:text-left">
        <p class="courses-eyebrow">Our courses</p>
        <h1 class="mt-3 text-4xl font-black text-white sm:text-5xl">Learn with a layout that fits every screen</h1>
        <p class="mt-4 text-sm leading-7 text-indigo-100/80 sm:text-base">
          Browse lessons in a mobile-friendly grid with cleaner spacing, responsive images, and touch-friendly actions.
        </p>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <course v-for="(item, index) in courses" :key="item.title">
          <div class="flex h-full flex-col gap-4">
            <router-link
              :to="{ name: 'CoursesView' }"
              :style="{
                background: currentColor,
                animationDelay: `${index * 0.15}s`,
              }"
              class="animate-fade-in inline-flex w-fit rounded-full px-4 py-2 text-sm font-bold tracking-wide text-white shadow-lg sm:text-base"
            >
              {{ item.title }}
            </router-link>

            <img
              :src="item.image"
              :alt="item.title"
              class="aspect-[4/3] w-full rounded-2xl object-cover"
            />

            <p class="text-sm leading-7 text-indigo-100/80 sm:text-base">
              {{ item.description }}
            </p>

            <div class="mt-auto flex flex-col gap-3 pt-2 sm:flex-row">
              <router-link
                :to="{ name: 'CoursesView' }"
                class="rounded-full border border-white/20 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Open lesson
              </router-link>
              <router-link
                :to="{ name: 'FinishCourse' }"
                class="rounded-full bg-amber-300 px-4 py-2 text-center text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
              >
                Finish course
              </router-link>
            </div>
          </div>
        </course>
      </div>
    </div>
  </section>
</template>

<script>
import course from '@/components/course.vue'
import biology from '@/assets/biology.avif'
import soccer from '@/assets/soccer.jpg'
import geography from '@/assets/geography.jpg'
import watermelon from '@/assets/watermelon.jpg'
import math from '@/assets/math.jpg'
export default {
  components: { course },
  data() {
    return {
      courses: [
        {
          title: 'Food science',
          image: watermelon,
          description: 'Explore nutrition, healthy habits, and the science behind the foods students enjoy every day.',
        },
        {
          title: 'Geography',
          image: geography,
          description: 'Build map-reading and world knowledge skills with visuals that stay clear on smaller screens.',
        },
        {
          title: 'Math',
          image: math,
          description: 'Practice number sense and problem-solving with focused lessons that are easy to browse on mobile.',
        },
        {
          title: 'Biology',
          image: biology,
          description: 'Learn how living things work through approachable science topics and strong visual examples.',
        },
        {
          title: 'Sport',
          image: soccer,
          description: 'Connect teamwork, movement, and discipline with lessons that keep students engaged across devices.',
        },
      ],
      colors: ['#7c3aed', '#111827', '#059669'],
      colorIndex: 0,
      colorTimer: null,
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
    this.colorTimer = setInterval(this.changeColor, 3000)
  },
  beforeUnmount() {
    clearInterval(this.colorTimer)
  },
}
</script>

<style scoped>
.courses-shell {
  background:
    radial-gradient(circle at top, rgba(251, 191, 36, 0.18), transparent 30%),
    linear-gradient(180deg, #312e81 0%, #1e1b4b 45%, #0f172a 100%);
}

.courses-eyebrow {
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(196, 181, 253, 0.9);
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(14px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-in-out forwards;
  opacity: 0;
}
</style>
