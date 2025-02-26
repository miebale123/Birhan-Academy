<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="h-screen bg-black">
    <Fireworks />
    <div
      class="absolute top-40 right-32 animate-slide-in-left text-4xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-red-300"
    >
      <div class="flex items-end">congradulat<Flame />ons!</div>
      <div>...</div>
    </div>
    <div class="absolute bottom-16 h-96 animate-slide-in-right left-64">
      <Vue3Lottie :animationData="programmer"></Vue3Lottie>
    </div>
  </div>
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import programmer from '../assets/programmer.json'
import Flame from './Atoms/flame.vue'
import Fireworks from './Atoms/fireworks.vue'

export default {
  components: { Vue3Lottie, Flame, Fireworks },
  data() {
    return {
      programmer,
    }
  },
}
</script>
<style>
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
