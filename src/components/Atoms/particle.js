import { randomVec } from './utils.js'

export default class Particle {
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

  draw(ctx) {
    ctx.globalAlpha = Math.max(1 - this.lifetime / 80, 0)
    ctx.fillStyle = this.col
    ctx.fillRect(this.x, this.y, 2, 2)
  }
}
