<!-- eslint-disable vue/multi-word-component-names
<template>
  <div class="relative overflow-hidden w-full justify-center items-center h-full">
    <div
      v-for="firework in fireworks"
      :key="firework.id"
      class="firework"
      :class="{ exploded: firework.exploded }"
      :style="{
        left: firework.x + 'px',
        bottom: '0px',
        '--y': firework.y + 'px',
      }"
    >
      <div v-if="firework.exploded">
        <div v-for="n in 200" :key="n" class="particle" :style="particleStyle()"></div>
      </div>
    </div>
  </div>

</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const fireworks = ref([])

    function launchFirework() {
      const firework = {
        id: Date.now(),
        // Calculate x to be within the left half of the screen
        x: Math.random() * (window.innerWidth / 2 - 200) + 100,
        y: 500 + Math.random() * 200,
        exploded: false,
      }

      fireworks.value.push(firework)

      // Simulate explosion
      setTimeout(() => {
        firework.exploded = true

        // Remove firework after explosion
        setTimeout(() => {
          fireworks.value = fireworks.value.filter((f) => f.id !== firework.id)
        }, 1000)
      }, 1000)
    }

    function particleStyle() {
      const angle = Math.random() * 360
      const radians = (angle * Math.PI) / 180
      const distance = Math.random() * 100 + 50
      const cos = Math.cos(radians)
      const sin = Math.sin(radians)

      return {
        '--dx': `${cos * distance}px`,
        '--dy': `${sin * distance}px`,
      }
    }

    // function randomColor() {
    //   const letters = '0123456789ABCDEF'
    //   let color = '#'
    //   for (let i = 0; i < 6; i++) {
    //     color += letters[Math.floor(Math.random() * 16)]
    //   }
    //   return color
    // }

    onMounted(() => {
      setInterval(launchFirework, 800)
    })

    return {
      fireworks,
      particleStyle,
    }
  },
}
</script>

<style scoped>
.firework {
  position: absolute;
  width: 1px;
  height: 10px;
  background: white;
  transition:
    width 0.3s ease-out,
    height 0.3s ease-out;
  animation: rise 1s cubic-bezier(0, 0.5, 0.5, 1) forwards;
}

.firework.exploded {
  width: 0;
  height: 0;
}

@keyframes rise {
  0% {
    bottom: 0;
    opacity: 1;
  }
  100% {
    bottom: var(--y);
    opacity: 1;
  }
}

.particle {
  position: absolute;
  width: 3px;
  height: 2px;
  background: rgb(187, 0, 255);
  border-radius: 50%;
  opacity: 0;
  animation: particle-fly 2s ease-out forwards;
}

@keyframes particle-fly {
  0% {
    transform: translate(0, 0);
    opacity: 1;
  }
  100% {
    transform: translate(var(--dx), var(--dy));
    opacity: 0;
  }
}
</style> -->


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

      if (Math.random() < 1 / 60) fireworks.push(new Firework(Math.random() * (width - 200) + 100))

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
.firework-container {
  width: 100vw;
  height: 90vh;
  position: relative;
  overflow: hidden;
}

canvas {
  display: block;
  width: 100%;
  height:90%;
}
</style>
