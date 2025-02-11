<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="h-[700px] bg-black">
    <Logo />
    <Fireworks />
    <div
      v-for="(point, index) in points"
      :key="index"
      class="absolute bg-white rounded-full mt-24"
      :style="{
        top: point.top + 'px',
        left: point.left + 'px',
        width: point.size + 'px',
        height: point.size + 'px',
      }"
    ></div>
    <div
      class="absolute top-40 right-32 animate-slide-in-left text-7xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-red-300"
    >
      <div class="flex items-end">congradulat<Flame />ons!</div>
      <div>መደብ ትምህርቲ ህፃናት</div>
      <div>ብስእላዊን ካልኦትን ኣብ</div>
      <div class="mt-10 ml-96">ኣለና።</div>
    </div>

    <div class="absolute bottom-16 h-96 animate-slide-in-right left-64">
      <Vue3Lottie :animationData="programmer"></Vue3Lottie>
    </div>
    <svg viewBox="0 0 1440 200" class="fill-black">
      <path d="M0,132C180,0,1360,160,1440,0L140,0L0,0Z"></path>
    </svg>
  </div>
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'

import programmer from '../assets/programmer.json'
import Fireworks from './Atoms/fireworks.vue'
import Flame from './Atoms/flame.vue'
import Logo from './Atoms/logo.vue'

export default {
  components: { Vue3Lottie, Fireworks, Flame, Logo },
  data() {
    return {
      programmer,
      points: this.generatePoints(),
    }
  },
  methods: {
    generatePoints() {
      const randomPoints = []
      for (let i = 0; i < 40; i++) {
        randomPoints.push({
          top: Math.random() * 500, // Random value between 0 and 500
          left: Math.random() * 1000,
          size: Math.random() * 20,
        })
      }
      return randomPoints
    },
  },
}
</script>
<style>
/* Animations */
@keyframes slideIn {
  0% {
    transform: translateX(var(--start));
  }
  60% {
    transform: translateX(var(--mid));
  }
  100% {
    transform: translateX(0);
  }
}
.animate-slide-in-left {
  --start: -100%;
  --mid: 20%;
  animation: slideIn 2s ease-out;
}
.animate-slide-in-right {
  --start: 100%;
  --mid: -20%;
  animation: slideIn 2s ease-out;
}
</style>
