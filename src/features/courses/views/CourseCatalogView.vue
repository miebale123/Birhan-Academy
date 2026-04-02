<script setup>
import CourseCard from '@/features/courses/components/CourseCard.vue'
import { useCourseCatalogView } from '@/features/courses/composables/useCourseCatalogView'

const { accentTones, courses, errorMessage, formatCurrency, isLoading } = useCourseCatalogView()
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
            <div class="flex flex-col items-start gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div class="min-w-0">
                <p class="text-xs font-bold uppercase tracking-[0.24em] text-sky-200/75">
                  {{ course.category }}
                </p>
                <h2
                  class="mt-2 text-xl font-black text-white transition-colors group-hover:text-sky-100 sm:text-2xl"
                >
                  {{ course.title }}
                </h2>
              </div>

              <span
                v-if="course.enrollment.statusLabel !== 'Ready to enroll'"
                :style="{ backgroundColor: accentTones[index % accentTones.length] }"
                class="self-start rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#082f49] sm:px-3 sm:text-xs sm:tracking-[0.18em]"
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
                class="inline-flex shrink-0 items-center gap-2 rounded-full border border-sky-300/18 bg-sky-400/12 px-3 py-2 text-xs font-semibold text-sky-50 transition-all duration-300 group-hover:border-sky-200/40 group-hover:bg-sky-300/18 sm:px-4 sm:text-sm"
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

@media (max-width: 639px) {
  .courses-shell {
    font-size: 0.95rem;
  }
}
</style>
