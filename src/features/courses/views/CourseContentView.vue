<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { courseApiService } from '@/features/courses/api/services/courseApi.service'

const route = useRoute()
const router = useRouter()

const course = ref(null)
const isLoading = ref(true)
const isSelectingLesson = ref(false)
const isCompleting = ref(false)
const errorMessage = ref('')

const courseId = computed(() => route.params.courseId?.toString() ?? '')

const progressSummary = computed(() => {
  if (!course.value) {
    return '0 of 0 lessons'
  }

  const totalLessons = course.value.lessonsCount
  const lessonOrder = course.value.modules.flatMap((module) => module.lessons)
  const activeIndex = lessonOrder.findIndex((lesson) => lesson.id === course.value.activeLesson?.id)
  const currentNumber = activeIndex >= 0 ? activeIndex + 1 : 1
  return `${currentNumber} of ${totalLessons} lessons`
})

async function loadClassroom() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    course.value = await courseApiService.getClassroom(courseId.value)
  } catch (error) {
    if (error.code === 'PAYMENT_REQUIRED') {
      await router.replace({ name: 'coursePayment', params: { courseId: courseId.value } })
      return
    }

    errorMessage.value = error.message || 'We could not load this classroom right now.'
  } finally {
    isLoading.value = false
  }
}

async function handleLessonSelection(lessonId) {
  if (!course.value || isSelectingLesson.value) {
    return
  }

  isSelectingLesson.value = true
  errorMessage.value = ''

  try {
    course.value = await courseApiService.selectLesson(courseId.value, lessonId)
  } catch (error) {
    errorMessage.value = error.message || 'We could not open that lesson right now.'
  } finally {
    isSelectingLesson.value = false
  }
}

async function handleCourseCompletion() {
  if (!course.value) {
    return
  }

  isCompleting.value = true
  errorMessage.value = ''

  try {
    await courseApiService.completeCourse(courseId.value)
    await router.push({ name: 'courseCompletion', params: { courseId: courseId.value } })
  } catch (error) {
    errorMessage.value = error.message || 'We could not complete this course right now.'
  } finally {
    isCompleting.value = false
  }
}

onMounted(() => {
  loadClassroom()
})

watch(courseId, () => {
  loadClassroom()
})
</script>

<template>
  <section class="manuscript-shell">
    <div class="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div class="max-w-3xl">
          <p class="manuscript-eyebrow">Classroom</p>
          <h1 class="mt-3 text-4xl font-black text-white sm:text-5xl">
            {{ course?.title || 'Loading class...' }}
          </h1>
          <p class="mt-4 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base">
            {{ course?.headline || 'Your classroom opens here after payment, with lesson navigation and reading space designed as a premium content experience.' }}
          </p>
        </div>

        <div class="grid gap-3 sm:grid-cols-3">
          <div class="stat-chip">
            <p class="stat-label">Progress</p>
            <p class="stat-value">{{ progressSummary }}</p>
          </div>
          <div class="stat-chip">
            <p class="stat-label">Instructor</p>
            <p class="stat-value">{{ course?.instructorName || 'Birhan Academy' }}</p>
          </div>
          <div class="stat-chip">
            <p class="stat-label">Access</p>
            <p class="stat-value">{{ course?.enrollment.statusLabel || 'Preparing' }}</p>
          </div>
        </div>
      </div>

      <div
        v-if="errorMessage"
        class="rounded-[1.5rem] border border-rose-300/30 bg-rose-500/12 px-5 py-4 text-sm leading-7 text-rose-50"
      >
        {{ errorMessage }}
      </div>

      <div v-if="isLoading" class="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div class="rounded-[2rem] border border-sky-300/18 bg-slate-900/75 p-5">
          <div class="animate-pulse space-y-4">
            <div class="h-6 w-32 rounded-full bg-white/10"></div>
            <div class="h-14 rounded-2xl bg-white/10"></div>
            <div class="h-14 rounded-2xl bg-white/10"></div>
            <div class="h-14 rounded-2xl bg-white/10"></div>
          </div>
        </div>

        <div class="rounded-[2rem] border border-sky-300/18 bg-slate-50 p-6">
          <div class="animate-pulse space-y-4">
            <div class="h-8 w-1/2 rounded-full bg-sky-100"></div>
            <div class="h-5 w-4/5 rounded-full bg-sky-100"></div>
            <div class="h-40 rounded-[1.5rem] bg-sky-100"></div>
          </div>
        </div>
      </div>

      <div v-else-if="course" class="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside class="sidebar-shell">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.24em] text-sky-200">Course map</p>
            <h2 class="mt-2 text-2xl font-black text-white">Modules & lessons</h2>
            <p class="mt-3 text-sm leading-6 text-slate-200/88">
              Payment unlocks the full classroom. Select a lesson on the left and continue through the course like a structured learning platform.
            </p>
          </div>

          <div class="mt-6 space-y-4">
            <section
              v-for="module in course.modules"
              :key="module.id"
              class="rounded-[1.5rem] border border-sky-300/12 bg-slate-900/72 p-4"
            >
              <p class="text-xs font-bold uppercase tracking-[0.2em] text-sky-200">{{ module.title }}</p>
              <p class="mt-2 text-sm leading-6 text-slate-300/85">{{ module.description }}</p>

              <div class="mt-4 space-y-2">
                <button
                  v-for="lesson in module.lessons"
                  :key="lesson.id"
                  type="button"
                  :disabled="isSelectingLesson"
                  :class="
                    course.activeLesson?.id === lesson.id
                      ? 'border-sky-300 bg-sky-100 text-slate-950'
                      : 'border-slate-700/70 bg-slate-900/70 text-slate-100 hover:bg-slate-800/80'
                  "
                  class="w-full rounded-[1.1rem] border px-4 py-3 text-left transition disabled:cursor-not-allowed disabled:opacity-70"
                  @click="handleLessonSelection(lesson.id)"
                >
                  <p class="text-sm font-semibold">{{ lesson.title }}</p>
                  <p class="mt-1 text-xs opacity-80">{{ lesson.durationLabel }}</p>
                </button>
              </div>
            </section>
          </div>
        </aside>

        <article class="content-shell">
          <div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p class="content-eyebrow">Current lesson</p>
              <h2 class="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
                {{ course.activeLesson.title }}
              </h2>
              <p class="mt-3 max-w-3xl text-base leading-8 text-slate-700">
                {{ course.activeLesson.summary }}
              </p>
            </div>

            <div class="flex flex-col gap-3 rounded-[1.5rem] border border-sky-300/25 bg-white/78 p-4 text-sm text-slate-700 shadow-[0_16px_30px_rgba(14,165,233,0.12)]">
              <p><span class="font-bold">Course:</span> {{ course.title }}</p>
              <p><span class="font-bold">Instructor:</span> {{ course.instructorName }}</p>
              <p><span class="font-bold">Lesson:</span> {{ progressSummary }}</p>
            </div>
          </div>

          <div class="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
            <div class="rounded-[1.75rem] border border-sky-300/25 bg-white/84 p-6 shadow-[0_20px_50px_rgba(14,165,233,0.14)]">
              <p class="text-xs font-bold uppercase tracking-[0.24em] text-sky-700">Learning text</p>
              <p class="mt-4 whitespace-pre-line text-[1.02rem] leading-8 text-slate-800">
                {{ course.activeLesson.content }}
              </p>
            </div>

            <div class="space-y-5">
              <section class="rounded-[1.75rem] border border-sky-300/25 bg-slate-50 p-5 shadow-[0_18px_45px_rgba(14,165,233,0.1)]">
                <p class="text-xs font-bold uppercase tracking-[0.24em] text-sky-700">Objective</p>
                <p class="mt-3 text-sm leading-7 text-slate-700">
                  {{ course.activeLesson.objective }}
                </p>
              </section>

              <section class="rounded-[1.75rem] border border-sky-300/25 bg-slate-50 p-5 shadow-[0_18px_45px_rgba(14,165,233,0.1)]">
                <p class="text-xs font-bold uppercase tracking-[0.24em] text-sky-700">Activities</p>
                <ul class="mt-3 space-y-3 text-sm leading-7 text-slate-700">
                  <li v-for="activity in course.activeLesson.activities" :key="activity">
                    {{ activity }}
                  </li>
                </ul>
              </section>

              <section class="rounded-[1.75rem] border border-sky-300/18 bg-slate-950 p-5 text-white shadow-[0_18px_45px_rgba(2,12,27,0.2)]">
                <p class="text-xs font-bold uppercase tracking-[0.24em] text-amber-200">Finish this course</p>
                <p class="mt-3 text-sm leading-7 text-slate-200/90">
                  When you are ready, mark the course complete and move to the celebration screen.
                </p>
                <button
                  type="button"
                  :disabled="isCompleting"
                  class="mt-4 w-full rounded-full bg-amber-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-70"
                  @click="handleCourseCompletion"
                >
                  {{ isCompleting ? 'Completing...' : 'Complete course' }}
                </button>
              </section>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.manuscript-shell {
  background:
    radial-gradient(circle at top, rgba(56, 189, 248, 0.18), transparent 26%),
    radial-gradient(circle at 78% 10%, rgba(59, 130, 246, 0.22), transparent 22%),
    linear-gradient(180deg, #0f172a 0%, #082f49 100%);
}

.manuscript-eyebrow,
.content-eyebrow,
.stat-label {
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.28em;
  text-transform: uppercase;
}

.manuscript-eyebrow {
  color: #7dd3fc;
}

.stat-chip {
  border: 1px solid rgba(125, 211, 252, 0.22);
  border-radius: 1.35rem;
  background: rgba(15, 23, 42, 0.64);
  padding: 1rem 1.1rem;
  color: #f8fafc;
}

.stat-label {
  color: rgba(125, 211, 252, 0.8);
}

.stat-value {
  margin-top: 0.65rem;
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.5;
}

.sidebar-shell {
  border: 1px solid rgba(125, 211, 252, 0.22);
  border-radius: 2rem;
  background:
    linear-gradient(180deg, rgba(15, 23, 42, 0.94), rgba(8, 23, 44, 0.96)),
    linear-gradient(135deg, rgba(56, 189, 248, 0.04), rgba(59, 130, 246, 0.08));
  padding: 1.4rem;
  box-shadow: 0 28px 70px rgba(2, 12, 27, 0.35);
}

.content-shell {
  border: 1px solid rgba(125, 211, 252, 0.28);
  border-radius: 2rem;
  padding: 1.5rem;
  background:
    linear-gradient(180deg, rgba(248, 250, 252, 0.98), rgba(224, 242, 254, 0.96)),
    repeating-linear-gradient(
      0deg,
      rgba(14, 165, 233, 0.035),
      rgba(14, 165, 233, 0.035) 1px,
      transparent 1px,
      transparent 26px
    );
  box-shadow: 0 28px 75px rgba(2, 12, 27, 0.22);
}

.content-eyebrow {
  color: #0369a1;
}
</style>
