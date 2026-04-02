import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useCelebrationCanvas() {
  const canvasElement = ref(null)

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

  onMounted(() => {
    initializeCanvas()
    window.addEventListener('resize', setCanvasSize)
    renderFrame()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', setCanvasSize)
    window.cancelAnimationFrame(animationFrameId)
  })

  return {
    canvasElement,
  }
}
