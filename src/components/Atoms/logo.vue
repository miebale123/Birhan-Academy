<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div ref="container" class="relative">
    <div
      v-for="(ball, index) in balls"
      :key="index"
      :style="{
        top: ball.y + 'px',
        left: ball.x + 'px',
        transform: 'rotate(' + ball.rotation + 'deg)',
      }"
      class="bg-yellow-400 font-bold  w-10 h-16 absolute flex justify-center items-center text-red-600 text-4xl"
    >
      {{ ball.text }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // ballSize: 10,
      gravity: 0.5,
      bounceFactor: 0.5,
      rollSpeed: 8,
      containerWidth: 0,
      groundLevel: window.innerHeight - 400, //height
      balls: [],
    }
  },
  mounted() {
    this.containerWidth = this.$refs.container.offsetWidth
    this.createBalls()
  },
  methods: {
    createBalls() {
      const numBalls = 9
      const spacing = (this.containerWidth - numBalls * 10) / (numBalls + 200)
      // Initialize balls
      for (let i = 0; i < numBalls; i++) {
        const finalX = spacing * (i + 1) + 30 * i // Evenly distribute

        this.balls.push({
          text: 'ሚዳካኣ ንሃርብ'.charAt(i),
          y: Math.random() * Math.PI * 1, // Start above screen
          vy: 0, //  velocity of y = vy
          x: this.containerWidth, // Start off-screen right
          finalX: finalX,
          rotation: 0, // Initial rotation
        })
      }

      this.startAnimation()
    },
    animateBall(ball, index) {
      // Gravity effect
      ball.vy += this.gravity
      ball.y += ball.vy

      // Bouncing effect
      if (ball.y + 10 >= this.groundLevel) {
        ball.y = this.groundLevel - 10
        ball.vy *= -this.bounceFactor // Reverse velocity for bounce
      }

      // Horizontal movement
      if (ball.x > 1000 - ball.finalX) {
        ball.x -= this.rollSpeed
        ball.rotation -= 10 // Rotation effect
      } else {
        // Smoothly bring the rotation back to 0 when it stops
        ball.rotation = ball.rotation * 0.8 // This gradually reduces rotation over time
      }

      //

      // Continue animating
      requestAnimationFrame(() => this.animateBall(ball, index))
    },
    startAnimation() {
      this.balls.forEach((ball, index) => {
        setTimeout(() => this.animateBall(ball, index), index * 200)
      })
    },
  },
}
</script>

<!--  if (i === 7) {
  continue
} -->
