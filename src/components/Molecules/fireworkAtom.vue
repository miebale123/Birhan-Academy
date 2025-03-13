<script setup>
import { onMounted, ref, nextTick } from 'vue'
import { setSize } from '../Atoms/utils.js'
import firework from '../Atoms/firework.js'

const canvas = ref(null) // Use ref instead of document.getElementById
let ctx, width, height
let fireworks = []
let particles = []

function setup() {
  if (!canvas.value) return // Ensure canvas exists

  const size = setSize(canvas.value)
  width = size.width
  height = size.height
  ctx = canvas.value.getContext('2d')
  ctx.fillRect(0, 0, width, height)
  fireworks.push(new firework(Math.random() * (width - 200) + 100, height, particles))
}

function loop() {
  if (!ctx) return

  ctx.globalAlpha = 0.1
  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, width, height)
  ctx.globalAlpha = 1

  for (let i = 0; i < fireworks.length; i++) {
    let done = fireworks[i].update()
    fireworks[i].draw(ctx)
    if (done) fireworks.splice(i, 1)
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].update()
    particles[i].draw(ctx)
    if (particles[i].lifetime > 80) particles.splice(i, 1)
  }

  if (Math.random() < 1 / 10) {
    fireworks.push(new firework(Math.random() * (width - 200) + 100, height, particles))
  }

  requestAnimationFrame(loop)
}

onMounted(async () => {
  await nextTick() // Ensure the DOM is updated before accessing the canvas
  setup()
  loop()
})
</script>

<template>
    <canvas ref="canvas"></canvas>
</template>
