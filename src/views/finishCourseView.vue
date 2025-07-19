<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div className="relative  bg-gray-100" ref="container">
    <canvas id="canvas"></canvas>
    <div className="absolute inset-0 z-50 bg-black/0  flex items-center justify-center ">
      <div class="text-white text-6xl">you have finished the course! congratulations!</div>
    </div>
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
      setSize() // Initial setup
      ctx = canvas.getContext('2d')
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, width, height)

      // Add initial firework
      fireworks.push(new Firework(Math.random() * (width - 200) + 100))
    }

    function loop() {
      ctx.globalAlpha = 0.1
      ctx.fillStyle = '#000000'
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
        if (particles[i].lifetime > 150) particles.splice(i, 1)
      }

      if (Math.random() < 1 / 2 / 10) fireworks.push(new Firework(Math.random() * width))

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
        ctx.globalAlpha = Math.max(1 - this.lifetime / 200, 0)
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
        if (this.y < height * 0.4) {
          // Dynamically adjust explosion height
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
      const colors = ['red', 'yellow', 'purple', 'orange', 'cyan', 'pink', 'white']
      const randomIndex = Math.floor(Math.random() * colors.length)
      return colors[randomIndex]
    }

    function randomVec(max) {
      const dir = Math.random() * Math.PI * 2
      const spd = Math.random() * max * 0.8
      return { x: Math.cos(dir) * spd, y: Math.sin(dir) * spd }
    }

    function setSize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight //* heightRatio

      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px` //same here

      width = window.innerWidth
      height = window.innerHeight //same here

      ctx = canvas.getContext('2d')
    }

    // Resize handler

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
change this to pure js
