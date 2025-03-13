import Particle from './particle.js'
import { randomCol } from './utils.js'

export default class Firework {
  constructor(x, height, particles) {
    this.x = x
    this.y = height
    this.isBlown = false
    this.col = randomCol()
    this.particles = particles
  }

  update() {
    this.y -= 3
    if (this.y < 350 - Math.sqrt(Math.random() * 500) * 40) {
      this.isBlown = true
      for (let i = 0; i < 60; i++) {
        this.particles.push(new Particle(this.x, this.y, this.col))
      }
    }
    return this.isBlown
  }

  draw(ctx) {
    ctx.globalAlpha = 1
    ctx.fillStyle = this.col
    ctx.fillRect(this.x, this.y, 2, 2)
  }
}
