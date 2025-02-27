<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Fireworks />
  <div class="bg-black h-[400px]">
    <div class="right-[10%] animate-slide-in-right text-4xl sm:text-6xl text-green-200">
      congratulations!
    </div>
    <div class="left-[10%] h-40 animate-slide-in-left">
      <Vue3Lottie :animationData="programmer" />
    </div>
  </div>
</template>

<script setup>
import Fireworks from './Atoms/fireworks.vue'
import programmer from '../assets/programmer.json'
import { Vue3Lottie } from 'vue3-lottie'
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
  --mid: 40%;
  animation: slideIn 2s ease-out;
}
.animate-slide-in-right {
  --start: 100%;
  --mid: -40%;
  animation: slideIn 2s ease-out;
}
</style>
