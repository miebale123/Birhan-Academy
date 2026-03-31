<script setup>
import { onMounted, ref } from 'vue'
import CourseCard from '@/features/courses/components/CourseCard.vue'
import { courseApiService } from '@/features/courses/api/services/courseApi.service'

const accentTones = ['#dbeafe', '#bfdbfe', '#bae6fd', '#a5f3fc', '#c7d2fe']
const courses = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(amount)
}

async function loadCourses() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    courses.value = await courseApiService.getCourseCatalog()
  } catch (error) {
    errorMessage.value = error.message || 'We could not load courses right now.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadCourses()
})
</script>

<template>
  <section class="courses-shell min-h-[calc(100dvh-var(--app-header-height))]">
    <div class="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div
        v-if="errorMessage"
        class="rounded-[1.5rem] border border-rose-300/30 bg-rose-400/12 px-5 py-4 text-sm leading-7 text-rose-50"
      >
        {{ errorMessage }}
      </div>

      <div v-if="isLoading" class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <CourseCard v-for="item in 3" :key="item">
          <div class="animate-pulse space-y-4">
            <div class="h-6 w-28 rounded-full bg-white/10"></div>
            <div class="h-8 w-4/5 rounded-2xl bg-white/10"></div>
            <div class="aspect-[4/3] rounded-[1.4rem] bg-white/10"></div>
            <div class="h-4 rounded-full bg-white/10"></div>
            <div class="h-4 w-4/5 rounded-full bg-white/10"></div>
            <div class="h-11 rounded-full bg-white/10"></div>
          </div>
        </CourseCard>
      </div>

      <div v-else class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <CourseCard
          v-for="(course, index) in courses"
          :key="course.id"
          :to="{ name: 'courseDetails', params: { courseId: course.id } }"
        >
          <div class="flex h-full flex-col gap-3">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-xs font-bold uppercase tracking-[0.24em] text-sky-200/75">
                  {{ course.category }}
                </p>
                <h2
                  class="mt-2 text-2xl font-black text-white transition-colors group-hover:text-sky-100"
                >
                  {{ course.title }}
                </h2>
              </div>

              <span
                v-if="course.enrollment.statusLabel !== 'Ready to enroll'"
                :style="{ backgroundColor: accentTones[index % accentTones.length] }"
                class="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#082f49]"
              >
                {{ course.enrollment.statusLabel }}
              </span>
            </div>

            <div class="overflow-hidden rounded-[1.4rem] border border-sky-300/10">
              <img
                :src="course.thumbnail"
                :alt="course.title"
                class="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>

            <div class="grid gap-3 sm:grid-cols-2">
              <div class="rounded-2xl border border-sky-300/12 bg-white/5 px-4 py-3">
                <p class="text-xs font-bold uppercase tracking-[0.2em] text-sky-200/70">
                  Instructor
                </p>
                <p class="mt-2 text-sm font-semibold text-white">{{ course.instructorName }}</p>
              </div>
              <div class="rounded-2xl border border-sky-300/12 bg-white/5 px-4 py-3">
                <p class="text-xs font-bold uppercase tracking-[0.2em] text-sky-200/70">Price</p>
                <p class="mt-2 text-sm font-semibold text-white">
                  ETB {{ formatCurrency(course.priceBirr) }}
                </p>
              </div>
            </div>

            <div class="mt-auto flex flex-wrap items-center justify-between gap-3 pt-1 text-sm">
              <span class="text-slate-300/78">{{ course.level }}</span>
              <span
                class="inline-flex shrink-0 items-center gap-2 rounded-full border border-sky-300/18 bg-sky-400/12 px-4 py-2 font-semibold text-sky-50 transition-all duration-300 group-hover:border-sky-200/40 group-hover:bg-sky-300/18"
              >
                <span>View details</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M4.5 10h11m0 0-4-4m4 4-4 4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </CourseCard>
      </div>
    </div>
  </section>
</template>

<style scoped>
.courses-shell {
  background: radial-gradient(circle at top, rgba(56, 189, 248, 0.2), transparent 32%),
    radial-gradient(circle at 82% 10%, rgba(59, 130, 246, 0.18), transparent 24%),
    linear-gradient(180deg, #0f172a 0%, #082f49 42%, #020617 100%);
}

.courses-eyebrow {
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #7dd3fc;
}
</style>
