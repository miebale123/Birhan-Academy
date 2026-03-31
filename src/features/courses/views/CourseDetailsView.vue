<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/features/auth/stores/auth.store'
import { courseApiService } from '@/features/courses/api/services/courseApi.service'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const course = ref(null)
const isLoading = ref(true)
const isOpening = ref(false)
const errorMessage = ref('')

const courseId = computed(() => route.params.courseId?.toString() ?? '')

const primaryActionLabel = computed(() => {
  if (isOpening.value) {
    return 'Opening...'
  }

  if (!authStore.isAuthenticated) {
    return 'Sign in to continue'
  }

  return course.value?.enrollment.primaryActionLabel || 'Continue'
})

const actionHint = computed(() => {
  if (!course.value) {
    return ''
  }

  if (!authStore.isAuthenticated) {
    return 'Sign in first, then continue from this course into payment or the classroom.'
  }

  switch (course.value.enrollment.status) {
    case 'pending_payment':
      return 'Continue to checkout to unlock the classroom and lesson materials.'
    case 'enrolled':
      return 'Jump back into the classroom and continue your active lesson.'
    case 'completed':
      return 'Review your classroom progress or revisit the completion experience.'
    default:
      return 'Review the outline, outcomes, and instructor details before enrolling.'
  }
})

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(amount)
}

function getRouteForCourse(currentCourse) {
  if (currentCourse.enrollment.status === 'completed') {
    return { name: 'courseCompletion', params: { courseId: currentCourse.id } }
  }

  if (currentCourse.enrollment.hasAccess) {
    return { name: 'courseContent', params: { courseId: currentCourse.id } }
  }

  return { name: 'coursePayment', params: { courseId: currentCourse.id } }
}

function getStatusBadgeClass(status) {
  switch (status) {
    case 'completed':
      return 'border-emerald-200/30 bg-emerald-300 text-emerald-950'
    case 'enrolled':
      return 'border-sky-200/30 bg-sky-100 text-slate-950'
    case 'pending_payment':
      return 'border-amber-200/35 bg-amber-300 text-slate-950'
    default:
      return 'border-white/15 bg-white/10 text-white'
  }
}

async function loadCourse() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    course.value = await courseApiService.getCourseDetails(courseId.value)
  } catch (error) {
    errorMessage.value = error.message || 'We could not load this course right now.'
  } finally {
    isLoading.value = false
  }
}

async function handlePrimaryAction() {
  if (!course.value || isOpening.value) {
    return
  }

  isOpening.value = true
  errorMessage.value = ''

  try {
    const targetRoute = getRouteForCourse(course.value)

    if (!authStore.isAuthenticated) {
      await router.push({
        name: 'signIn',
        query: {
          redirect: router.resolve(targetRoute).fullPath,
        },
      })
      return
    }

    await router.push(targetRoute)
  } catch (error) {
    errorMessage.value = error.message || 'We could not open the next course step right now.'
  } finally {
    isOpening.value = false
  }
}

onMounted(() => {
  loadCourse()
})

watch(courseId, () => {
  loadCourse()
})
</script>

<template>
  <section class="details-shell">
    <div class="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div class="flex items-center justify-between gap-3">
        <RouterLink
          :to="{ name: 'courseCatalog' }"
          class="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
        >
          Back to courses
        </RouterLink>
      </div>

      <div
        v-if="errorMessage"
        class="rounded-[1.5rem] border border-rose-300/30 bg-rose-400/12 px-5 py-4 text-sm leading-7 text-rose-50"
      >
        {{ errorMessage }}
      </div>

      <div v-if="isLoading" class="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_360px]">
        <div class="rounded-[2rem] border border-sky-300/18 bg-white/5 p-6">
          <div class="animate-pulse space-y-4">
            <div class="h-5 w-28 rounded-full bg-white/10"></div>
            <div class="h-10 w-3/4 rounded-full bg-white/10"></div>
            <div class="h-5 w-4/5 rounded-full bg-white/10"></div>
            <div class="h-28 rounded-[1.5rem] bg-white/10"></div>
            <div class="h-12 w-48 rounded-full bg-white/10"></div>
          </div>
        </div>

        <div class="rounded-[2rem] border border-sky-300/18 bg-white/5 p-6">
          <div class="animate-pulse space-y-4">
            <div class="aspect-[4/3] rounded-[1.6rem] bg-white/10"></div>
            <div class="h-5 w-2/3 rounded-full bg-white/10"></div>
            <div class="h-5 w-1/2 rounded-full bg-white/10"></div>
          </div>
        </div>
      </div>

      <template v-else-if="course">
        <div class="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_360px]">
          <article
            class="rounded-[2rem] border border-sky-300/15 bg-[rgba(8,23,44,0.72)] p-6 shadow-[0_28px_70px_rgba(2,12,27,0.32)] backdrop-blur"
          >
            <div class="flex flex-wrap items-center gap-3">
              <p class="text-xs font-bold uppercase tracking-[0.24em] text-sky-200/82">
                {{ course.category }}
              </p>
              <span
                :class="getStatusBadgeClass(course.enrollment.status)"
                class="rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]"
              >
                {{ course.enrollment.statusLabel }}
              </span>
            </div>

            <h1 class="mt-4 text-4xl font-black text-white sm:text-5xl">{{ course.title }}</h1>
            <p class="mt-4 max-w-3xl text-lg leading-8 text-slate-200/86">
              {{ course.headline }}
            </p>
            <p class="mt-5 max-w-3xl text-sm leading-7 text-slate-200/80 sm:text-base">
              {{ course.description }}
            </p>

            <div class="mt-6 grid gap-4 sm:grid-cols-3">
              <div class="info-chip">
                <p class="info-chip-label">Price</p>
                <p class="info-chip-value">ETB {{ formatCurrency(course.priceBirr) }}</p>
              </div>
              <div class="info-chip">
                <p class="info-chip-label">Learners</p>
                <p class="info-chip-value">{{ course.learnerCountLabel }}</p>
              </div>
              <div class="info-chip">
                <p class="info-chip-label">Course size</p>
                <p class="info-chip-value">
                  {{ course.modulesCount }} modules · {{ course.lessonsCount }} lessons
                </p>
              </div>
            </div>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                :disabled="isOpening"
                class="rounded-full bg-amber-300 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-70"
                @click="handlePrimaryAction"
              >
                {{ primaryActionLabel }}
              </button>

              <RouterLink
                :to="{ name: 'courseCatalog' }"
                class="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Browse more courses
              </RouterLink>
            </div>

            <p class="mt-4 text-sm leading-7 text-slate-300/82">
              {{ actionHint }}
            </p>
          </article>

          <aside class="space-y-5">
            <div class="overflow-hidden rounded-[1.9rem] border border-sky-300/15 shadow-[0_28px_70px_rgba(2,12,27,0.32)]">
              <img
                :src="course.thumbnail"
                :alt="course.title"
                class="aspect-[4/3] w-full object-cover"
              />
            </div>

            <section class="details-panel">
              <p class="panel-label">Instructor</p>
              <h2 class="mt-2 text-xl font-black text-white">{{ course.instructorName }}</h2>
              <p class="mt-2 text-sm leading-7 text-slate-200/84">{{ course.instructorTitle }}</p>
            </section>

            <section class="details-panel">
              <p class="panel-label">Course facts</p>
              <div class="mt-4 grid gap-3">
                <div class="fact-row">
                  <span>Level</span>
                  <span>{{ course.level }}</span>
                </div>
                <div class="fact-row">
                  <span>Access</span>
                  <span>{{ course.durationLabel }}</span>
                </div>
                <div class="fact-row">
                  <span>Reviews</span>
                  <span>{{ course.rating }} / 5</span>
                </div>
              </div>
            </section>
          </aside>
        </div>

        <div class="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <section class="details-surface">
            <p class="section-label">What you will learn</p>
            <ul class="mt-4 space-y-3 text-sm leading-7 text-slate-200/88">
              <li v-for="outcome in course.outcomes" :key="outcome" class="lesson-row">
                {{ outcome }}
              </li>
            </ul>
          </section>

          <section class="details-surface">
            <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p class="section-label">Course outline</p>
                <h2 class="mt-2 text-2xl font-black text-white">Modules and lessons preview</h2>
              </div>
              <p class="text-sm leading-6 text-slate-300/80">
                Full lesson text opens inside the classroom after enrollment.
              </p>
            </div>

            <div class="mt-5 space-y-4">
              <section
                v-for="module in course.modules"
                :key="module.id"
                class="rounded-[1.5rem] border border-sky-300/12 bg-slate-950/35 p-4"
              >
                <p class="text-xs font-bold uppercase tracking-[0.2em] text-sky-200">
                  {{ module.title }}
                </p>
                <p class="mt-2 text-sm leading-7 text-slate-300/82">{{ module.description }}</p>

                <div class="mt-4 space-y-3">
                  <article
                    v-for="lesson in module.lessons"
                    :key="lesson.id"
                    class="lesson-card"
                  >
                    <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <h3 class="text-sm font-semibold text-white">{{ lesson.title }}</h3>
                      <span class="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200/75">
                        {{ lesson.durationLabel }}
                      </span>
                    </div>
                    <p class="mt-2 text-sm leading-7 text-slate-300/82">{{ lesson.summary }}</p>
                  </article>
                </div>
              </section>
            </div>
          </section>
        </div>
      </template>
    </div>
  </section>
</template>

<style scoped>
.details-shell {
  background:
    radial-gradient(circle at top, rgba(56, 189, 248, 0.2), transparent 28%),
    radial-gradient(circle at 80% 10%, rgba(59, 130, 246, 0.18), transparent 22%),
    linear-gradient(180deg, #0f172a 0%, #082f49 100%);
}

.info-chip,
.details-panel,
.details-surface {
  border: 1px solid rgba(125, 211, 252, 0.14);
  background: rgba(8, 23, 44, 0.64);
  box-shadow: 0 22px 50px rgba(2, 12, 27, 0.24);
}

.info-chip {
  border-radius: 1.35rem;
  padding: 1rem 1.05rem;
}

.info-chip-label,
.panel-label,
.section-label {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(125, 211, 252, 0.82);
}

.info-chip-value {
  margin-top: 0.6rem;
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.6;
  color: white;
}

.details-panel,
.details-surface {
  border-radius: 1.7rem;
  padding: 1.35rem;
}

.fact-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.04);
  padding: 0.85rem 0.95rem;
  font-size: 0.92rem;
  color: rgba(226, 232, 240, 0.92);
}

.lesson-row,
.lesson-card {
  border-radius: 1.15rem;
  background: rgba(255, 255, 255, 0.04);
}

.lesson-row {
  padding: 0.95rem 1rem;
}

.lesson-card {
  padding: 0.95rem 1rem;
}
</style>
