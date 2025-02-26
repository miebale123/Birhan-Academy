<script setup>
import { ref, onMounted, nextTick } from 'vue'
import gsap from 'gsap'

const letters = 'Birhan Academy'.split('')
const objects = ref([])
const spacing = 25

onMounted(async () => {
  // Create objects for animation
  objects.value = letters
    .map((letter, i) => {
      if (letter === ' ') return null // Ignore spaces

      return {
        id: i,
        char: letter,
        x: i * spacing,
        y: 0,
        vy: Math.random() * 3,
      }
    })
    .filter(Boolean)

  // Ensure elements are rendered before animating
  await nextTick()
  animate()
})

function animate() {
  objects.value.forEach((el) => {
    gsap.to(el, {
      y: window.innerHeight - 200,
      ease: 'bounce.out',
      duration: 2 + Math.random(), // Random duration for varied effect
    })
  })
}
</script>

<template>
  <div>
    <div
      v-for="obj in objects"
      :key="obj.id"
      ref="elements"
      class="absolute w-8 h-8 bg-clip bg-red-800 flex items-center justify-center font-bold rounded-full"
      :style="{ left: obj.x + 'px', top: obj.y + 'px' }"
    >
      {{ obj.char }}
    </div>
  </div>
</template>
