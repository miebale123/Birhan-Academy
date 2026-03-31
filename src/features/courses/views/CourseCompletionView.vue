<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { courseApiService } from '@/features/courses/api/services/courseApi.service'

const route = useRoute()
const router = useRouter()

const canvasElement = ref(null)
const course = ref(null)
const isLoading = ref(true)
const errorMessage = ref('')

const courseId = computed(() => route.params.courseId?.toString() ?? '')

let context
let width = 0
let height = 0
let animationFrameId = 0
const fireworks = []
const particles = []

class Particle {
  constructor(x, y, color) {
    this.x = x
    this.y = y
    this.color = color
    this.velocity = randomVector(2)
    this.lifetime = 0
  }

  update() {
    this.x += this.velocity.x
    this.y += this.velocity.y
    this.velocity.y += 0.02
    this.velocity.x *= 0.99
    this.velocity.y *= 0.99
    this.lifetime += 1
  }

  draw() {
    context.globalAlpha = Math.max(1 - this.lifetime / 200, 0)
    context.fillStyle = this.color
    context.fillRect(this.x, this.y, 2, 2)
  }
}

class Firework {
  constructor(x) {
    this.x = x
    this.y = height
    this.isExploded = false
    this.color = randomColor()
  }

  update() {
    this.y -= 3

    if (this.y < height * 0.4) {
      this.isExploded = true

      for (let index = 0; index < 60; index += 1) {
        particles.push(new Particle(this.x, this.y, this.color))
      }
    }

    return this.isExploded
  }

  draw() {
    context.globalAlpha = 1
    context.fillStyle = this.color
    context.fillRect(this.x, this.y, 2, 2)
  }
}

function randomColor() {
  const colors = ['#7dd3fc', '#38bdf8', '#60a5fa', '#fbbf24', '#ffffff']
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}

function randomVector(maxSpeed) {
  const direction = Math.random() * Math.PI * 2
  const speed = Math.random() * maxSpeed * 0.8

  return {
    x: Math.cos(direction) * speed,
    y: Math.sin(direction) * speed,
  }
}

function setCanvasSize() {
  const canvas = canvasElement.value

  if (!canvas) {
    return
  }

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  canvas.style.width = `${window.innerWidth}px`
  canvas.style.height = `${window.innerHeight}px`

  width = window.innerWidth
  height = window.innerHeight
  context = canvas.getContext('2d')
}

function initializeCanvas() {
  setCanvasSize()

  if (!context) {
    return
  }

  context.fillStyle = '#020617'
  context.fillRect(0, 0, width, height)
  fireworks.push(new Firework(Math.random() * (width - 200) + 100))
}

function renderFrame() {
  if (!context) {
    return
  }

  context.globalAlpha = 0.12
  context.fillStyle = '#020617'
  context.fillRect(0, 0, width, height)
  context.globalAlpha = 1

  for (let index = fireworks.length - 1; index >= 0; index -= 1) {
    const firework = fireworks[index]
    const isExploded = firework.update()
    firework.draw()

    if (isExploded) {
      fireworks.splice(index, 1)
    }
  }

  for (let index = particles.length - 1; index >= 0; index -= 1) {
    const particle = particles[index]
    particle.update()
    particle.draw()

    if (particle.lifetime > 150) {
      particles.splice(index, 1)
    }
  }

  if (Math.random() < 0.05) {
    fireworks.push(new Firework(Math.random() * width))
  }

  animationFrameId = window.requestAnimationFrame(renderFrame)
}

async function loadCourse() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    course.value = await courseApiService.getClassroom(courseId.value)
  } catch (error) {
    if (error.code === 'PAYMENT_REQUIRED') {
      await router.replace({ name: 'coursePayment', params: { courseId: courseId.value } })
      return
    }

    errorMessage.value = error.message || 'We could not load the completion page.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  initializeCanvas()
  window.addEventListener('resize', setCanvasSize)
  renderFrame()
  loadCourse()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', setCanvasSize)
  window.cancelAnimationFrame(animationFrameId)
})

watch(courseId, () => {
  loadCourse()
})
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
          <router-link
            :to="{ name: 'courseCatalog' }"
            class="rounded-full bg-amber-300 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-200"
          >
            Browse more courses
          </router-link>
          <router-link
            :to="{ name: 'courseContent', params: { courseId } }"
            class="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Reopen class
          </router-link>
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
