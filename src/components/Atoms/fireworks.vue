<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="firework-container" ref="container">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'

export default {
  setup() {
    const container = ref(null)
    let canvas, ctx, width, height
    let fireworks = []
    let particles = []

    function setup() {
      canvas = document.getElementById('canvas')
      setSize(canvas)
      ctx = canvas.getContext('2d')
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, width, height)

      // Add initial firework
      fireworks.push(new Firework(Math.random() * (width - 200) + 100))
    }

    function loop() {
      ctx.globalAlpha = 0.1
      ctx.fillStyle = '#000000'
      ctx.fill = 'color'
      ctx.fillRect(0, 0, width, height)
      ctx.globalAlpha = 1

      for (let i = 0; i < fireworks.length; i++) {
        let done = fireworks[i].update()
        fireworks[i].draw()
        if (done) fireworks.splice(i, 1)
      }

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
        if (particles[i].lifetime > 80) particles.splice(i, 1)
      }

      if (Math.random() < 1 / 20) fireworks.push(new Firework(Math.random() * (width - 200) + 100))

      requestAnimationFrame(loop)
    }

    class Particle {
      constructor(x, y, col) {
        this.x = x
        this.y = y
        this.col = col
        this.vel = randomVec(2)
        this.lifetime = 0
      }

      update() {
        this.x += this.vel.x
        this.y += this.vel.y
        this.vel.y += 0.02
        this.vel.x *= 0.99
        this.vel.y *= 0.99
        this.lifetime++
      }

      draw() {
        ctx.globalAlpha = Math.max(1 - this.lifetime / 80, 0)
        ctx.fillStyle = this.col
        ctx.fillRect(this.x, this.y, 2, 2)
      }
    }

    class Firework {
      constructor(x) {
        this.x = x
        this.y = height
        this.isBlown = false
        this.col = randomCol()
      }

      update() {
        this.y -= 3
        if (this.y < 350 - Math.sqrt(Math.random() * 500) * 40) {
          this.isBlown = true
          for (let i = 0; i < 60; i++) {
            particles.push(new Particle(this.x, this.y, this.col))
          }
        }
        return this.isBlown
      }

      draw() {
        ctx.globalAlpha = 1
        ctx.fillStyle = this.col
        ctx.fillRect(this.x, this.y, 2, 2)
      }
    }

    function randomCol() {
      const letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    }

    function randomVec(max) {
      const dir = Math.random() * Math.PI * 2
      const spd = Math.random() * max
      return { x: Math.cos(dir) * spd, y: Math.sin(dir) * spd }
    }

    function setSize(canvas) {
      const dpr = window.devicePixelRatio || 1
      const heightRatio = 0.5 // Use 70% of the window height (adjust as needed)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * heightRatio * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight * heightRatio}px`
      width = window.innerWidth
      height = window.innerHeight * heightRatio
      canvas.getContext('2d').scale(dpr, dpr)
    }

    onMounted(() => {
      setup()
      loop()
    })

    return {
      container,
    }
  },
}
</script>

<style scoped>
canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
