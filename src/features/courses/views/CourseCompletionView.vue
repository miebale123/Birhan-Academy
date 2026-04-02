<script setup>
import { useCourseCompletionView } from '@/features/courses/composables/useCourseCompletionView'
import UiButton from '@/shared/components/ui/UiButton.vue'

const { canvasElement, course, courseId, errorMessage, isLoading } = useCourseCompletionView()
</script>

<template>
  <section class="relative min-h-[calc(100vh-9rem)] overflow-hidden bg-[#020617]">
    <canvas ref="canvasElement"></canvas>
    <div class="absolute inset-0 z-50 flex items-center justify-center px-4 py-10">
      <div class="completion-card max-w-3xl rounded-[2rem] border border-sky-300/18 p-6 text-center text-white shadow-[0_30px_90px_rgba(2,6,23,0.45)] backdrop-blur md:p-10">
        <p class="completion-eyebrow">Course completed</p>

        <h1 class="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl">
          {{
            isLoading
              ? 'Preparing your celebration...'
              : course?.title
                ? `You completed ${course.title}.`
                : 'Your learning milestone is ready.'
          }}
        </h1>

        <p class="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-200/85 sm:text-base">
          {{
            errorMessage ||
            'The full journey is now connected: catalog, enrollment, payment, class, and completion. This screen marks the final milestone.'
          }}
        </p>

        <div class="mt-8 grid gap-4 sm:grid-cols-3">
          <div class="rounded-[1.5rem] border border-white/10 bg-white/6 px-4 py-4">
            <p class="text-xs font-bold uppercase tracking-[0.2em] text-sky-200/80">Status</p>
            <p class="mt-2 text-sm font-semibold text-white">
              {{ course?.enrollment.statusLabel || 'Completed' }}
            </p>
          </div>
          <div class="rounded-[1.5rem] border border-white/10 bg-white/6 px-4 py-4">
            <p class="text-xs font-bold uppercase tracking-[0.2em] text-sky-200/80">Instructor</p>
            <p class="mt-2 text-sm font-semibold text-white">{{ course?.instructorName || 'Birhan Academy' }}</p>
          </div>
          <div class="rounded-[1.5rem] border border-white/10 bg-white/6 px-4 py-4">
            <p class="text-xs font-bold uppercase tracking-[0.2em] text-sky-200/80">Next step</p>
            <p class="mt-2 text-sm font-semibold text-white">Choose another course</p>
          </div>
        </div>

        <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <UiButton :to="{ name: 'courseCatalog' }" variant="primary">
            Browse more courses
          </UiButton>
          <UiButton :to="{ name: 'courseContent', params: { courseId } }" variant="secondary">
            Reopen class
          </UiButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.completion-card {
  background:
    linear-gradient(180deg, rgba(15, 23, 42, 0.82), rgba(8, 47, 73, 0.68)),
    linear-gradient(120deg, rgba(56, 189, 248, 0.06), rgba(59, 130, 246, 0.05));
}

.completion-eyebrow {
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(125, 211, 252, 0.88);
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 9rem);
}
</style>
