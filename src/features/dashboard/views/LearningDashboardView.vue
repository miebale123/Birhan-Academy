<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/features/auth/stores/auth.store'
import { courseApiService } from '@/features/courses/api/services/courseApi.service'

const authStore = useAuthStore()
const { currentUser } = storeToRefs(authStore)

const courses = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

const firstName = computed(() => authStore.firstName || 'Learner')

const activeCourses = computed(() => {
  return courses.value.filter((course) => course.enrollment.status === 'enrolled')
})

const pendingCourses = computed(() => {
  return courses.value.filter((course) => course.enrollment.status === 'pending_payment')
})

const completedCourses = computed(() => {
  return courses.value.filter((course) => course.enrollment.status === 'completed')
})

const recommendedCourses = computed(() => {
  return courses.value.filter((course) => course.enrollment.status === 'browsing').slice(0, 3)
})

const summaryCards = computed(() => {
  return [
    {
      label: 'In class',
      value: activeCourses.value.length,
      tone: 'border-sky-300/18 bg-sky-400/10 text-sky-50',
    },
    {
      label: 'Payment required',
      value: pendingCourses.value.length,
      tone: 'border-amber-300/18 bg-amber-300/12 text-amber-100',
    },
    {
      label: 'Completed',
      value: completedCourses.value.length,
      tone: 'border-emerald-300/18 bg-emerald-300/12 text-emerald-100',
    },
  ]
})

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(amount)
}

function getCourseRoute(course) {
  if (course.enrollment.status === 'completed') {
    return { name: 'courseCompletion', params: { courseId: course.id } }
  }

  if (course.enrollment.status === 'enrolled') {
    return { name: 'courseContent', params: { courseId: course.id } }
  }

  if (course.enrollment.status === 'pending_payment') {
    return { name: 'coursePayment', params: { courseId: course.id } }
  }

  return { name: 'courseDetails', params: { courseId: course.id } }
}

async function loadCourses() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    courses.value = await courseApiService.getCourseCatalog()
  } catch (error) {
    errorMessage.value = error.message || 'We could not load your learning dashboard right now.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadCourses()
})
</script>

<template>
  <section class="dashboard-shell min-h-[calc(100dvh-var(--app-header-height))] text-white">
    <div class="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section
        class="rounded-[2rem] border border-sky-300/15 bg-[rgba(8,23,44,0.72)] p-6 shadow-[0_28px_70px_rgba(2,12,27,0.32)] backdrop-blur sm:p-8"
      >
        <p class="text-xs font-black uppercase tracking-[0.28em] text-amber-300/85">
          My learning
        </p>
        <h1 class="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl">
          Welcome back, {{ firstName }}.
        </h1>
        <p class="mt-4 max-w-3xl text-base leading-8 text-slate-200/84 sm:text-lg">
          Track active courses, finish any pending payment, and jump back into class from one
          simple dashboard.
        </p>

        <div class="mt-6 flex flex-wrap gap-3">
          <RouterLink
            :to="{ name: 'courseCatalog' }"
            class="inline-flex rounded-full bg-amber-300 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_20px_50px_rgba(245,158,11,0.28)] transition hover:bg-amber-200"
          >
            Browse courses
          </RouterLink>
          <RouterLink
            v-if="activeCourses[0]"
            :to="getCourseRoute(activeCourses[0])"
            class="inline-flex rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Continue latest course
          </RouterLink>
        </div>
      </section>

      <div v-if="errorMessage" class="rounded-[1.5rem] border border-rose-300/30 bg-rose-400/12 px-5 py-4 text-sm leading-7 text-rose-50">
        {{ errorMessage }}
      </div>

      <div v-if="isLoading" class="grid gap-4 sm:grid-cols-3">
        <div v-for="item in 3" :key="item" class="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
          <div class="animate-pulse space-y-3">
            <div class="h-4 w-24 rounded-full bg-white/10"></div>
            <div class="h-9 w-16 rounded-full bg-white/10"></div>
          </div>
        </div>
      </div>

      <div v-else class="grid gap-4 sm:grid-cols-3">
        <article
          v-for="card in summaryCards"
          :key="card.label"
          :class="card.tone"
          class="rounded-[1.5rem] border p-5 shadow-[0_18px_40px_rgba(2,12,27,0.22)]"
        >
          <p class="text-xs font-black uppercase tracking-[0.24em]">{{ card.label }}</p>
          <p class="mt-3 text-4xl font-black">{{ card.value }}</p>
        </article>
      </div>

      <div class="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <section class="space-y-6">
          <section class="dashboard-panel">
            <div class="flex items-end justify-between gap-3">
              <div>
                <p class="panel-label">Continue learning</p>
                <h2 class="mt-2 text-2xl font-black text-white">Active classroom access</h2>
              </div>
              <p class="text-sm text-slate-300/72">{{ activeCourses.length }} active</p>
            </div>

            <div v-if="activeCourses.length" class="mt-5 space-y-4">
              <article
                v-for="course in activeCourses"
                :key="course.id"
                class="course-row"
              >
                <div class="min-w-0">
                  <p class="text-xs font-bold uppercase tracking-[0.22em] text-sky-200/80">
                    {{ course.category }}
                  </p>
                  <h3 class="mt-2 text-xl font-black text-white">{{ course.title }}</h3>
                  <p class="mt-2 text-sm leading-7 text-slate-300/82">{{ course.headline }}</p>
                  <p class="mt-3 text-sm text-slate-400">
                    {{ course.lessonsCount }} lessons · {{ course.durationLabel }}
                  </p>
                </div>

                <RouterLink :to="getCourseRoute(course)" class="dashboard-link-button">
                  Go to class
                </RouterLink>
              </article>
            </div>

            <div v-else class="empty-state">
              <p class="text-lg font-bold text-white">No active courses yet.</p>
              <p class="mt-2 text-sm leading-7 text-slate-300/82">
                Start with the course catalog and return here once you have joined a class.
              </p>
            </div>
          </section>

          <section class="dashboard-panel">
            <div class="flex items-end justify-between gap-3">
              <div>
                <p class="panel-label">Payment queue</p>
                <h2 class="mt-2 text-2xl font-black text-white">Courses waiting for checkout</h2>
              </div>
              <p class="text-sm text-slate-300/72">{{ pendingCourses.length }} pending</p>
            </div>

            <div v-if="pendingCourses.length" class="mt-5 space-y-4">
              <article
                v-for="course in pendingCourses"
                :key="course.id"
                class="course-row"
              >
                <div class="min-w-0">
                  <p class="text-xs font-bold uppercase tracking-[0.22em] text-amber-200/85">
                    {{ course.category }}
                  </p>
                  <h3 class="mt-2 text-xl font-black text-white">{{ course.title }}</h3>
                  <p class="mt-2 text-sm leading-7 text-slate-300/82">{{ course.headline }}</p>
                  <p class="mt-3 text-sm text-slate-400">
                    ETB {{ formatCurrency(course.priceBirr) }} · {{ course.enrollment.statusLabel }}
                  </p>
                </div>

                <RouterLink :to="getCourseRoute(course)" class="dashboard-link-button dashboard-link-button-amber">
                  Complete payment
                </RouterLink>
              </article>
            </div>

            <div v-else class="empty-state">
              <p class="text-lg font-bold text-white">Nothing is waiting for payment.</p>
              <p class="mt-2 text-sm leading-7 text-slate-300/82">
                When a course needs checkout before access, it will appear here.
              </p>
            </div>
          </section>
        </section>

        <aside class="space-y-6">
          <section class="dashboard-panel">
            <p class="panel-label">Completed</p>
            <h2 class="mt-2 text-2xl font-black text-white">Finished courses</h2>

            <div v-if="completedCourses.length" class="mt-5 space-y-3">
              <RouterLink
                v-for="course in completedCourses"
                :key="course.id"
                :to="getCourseRoute(course)"
                class="mini-card transition hover:border-emerald-200/30 hover:bg-white/8"
              >
                <span class="text-sm font-bold text-white">{{ course.title }}</span>
                <span class="mt-1 text-xs uppercase tracking-[0.18em] text-emerald-200/85">
                  {{ course.enrollment.statusLabel }}
                </span>
              </RouterLink>
            </div>

            <div v-else class="empty-state empty-state-compact">
              <p class="text-sm leading-7 text-slate-300/82">
                Completed courses will appear here for quick review.
              </p>
            </div>
          </section>

          <section class="dashboard-panel">
            <p class="panel-label">Recommended next</p>
            <h2 class="mt-2 text-2xl font-black text-white">Browse more learning</h2>

            <div class="mt-5 space-y-3">
              <RouterLink
                v-for="course in recommendedCourses"
                :key="course.id"
                :to="getCourseRoute(course)"
                class="mini-card transition hover:border-sky-200/30 hover:bg-white/8"
              >
                <span class="text-sm font-bold text-white">{{ course.title }}</span>
                <span class="mt-1 text-sm text-slate-300/80">
                  {{ course.level }} · {{ course.category }}
                </span>
              </RouterLink>
            </div>
          </section>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dashboard-shell {
  background:
    radial-gradient(circle at top, rgba(56, 189, 248, 0.2), transparent 28%),
    radial-gradient(circle at 80% 10%, rgba(59, 130, 246, 0.16), transparent 22%),
    linear-gradient(180deg, #0f172a 0%, #082f49 42%, #020617 100%);
}

.dashboard-panel {
  border: 1px solid rgba(125, 211, 252, 0.14);
  border-radius: 1.7rem;
  background: rgba(8, 23, 44, 0.64);
  padding: 1.35rem;
  box-shadow: 0 22px 50px rgba(2, 12, 27, 0.24);
}

.panel-label {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(125, 211, 252, 0.82);
}

.course-row,
.mini-card,
.empty-state {
  border-radius: 1.25rem;
  background: rgba(255, 255, 255, 0.04);
}

.course-row {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.mini-card {
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0.95rem 1rem;
}

.empty-state {
  margin-top: 1.25rem;
  padding: 1rem;
}

.empty-state-compact {
  padding: 0.95rem 1rem;
}

.dashboard-link-button {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background: rgba(56, 189, 248, 0.18);
  padding: 0.7rem 1rem;
  font-size: 0.92rem;
  font-weight: 700;
  color: white;
  transition: background-color 160ms ease;
}

.dashboard-link-button:hover {
  background: rgba(56, 189, 248, 0.26);
}

.dashboard-link-button-amber {
  background: rgba(245, 158, 11, 0.18);
}

.dashboard-link-button-amber:hover {
  background: rgba(245, 158, 11, 0.28);
}

@media (min-width: 768px) {
  .course-row {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
