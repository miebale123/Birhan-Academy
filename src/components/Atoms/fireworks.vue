<!-- eslint-disable vue/multi-word-component-names -->
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
  background: yellow;
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
</style>
