<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import fireworkAtom from './Molecules/fireworkAtom.vue'
import programmer from '../assets/programmer.json'
import { Vue3Lottie } from 'vue3-lottie'
// import flameAtom from './Atoms/flameAtom.vue'
</script>

<template>
  <main>
    <fireworkAtom class="mt-22" />
    <div class="bg-black flex items-center justify-center">
      <div class="bg-gradient-to-r via-yellow-100">
        <div class="text-6xl bg-gradient-to-r">congratulations</div>
      </div>
      <br />
      <Vue3Lottie :animationData="programmer" :height="200" :width="200" />
    </div>
  </main>
</template>
