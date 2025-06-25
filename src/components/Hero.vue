<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import programmer from '../assets/programmer.json'
import { Vue3Lottie } from 'vue3-lottie'
</script>

<template>
  <main>
    <div class="bg-gray-900 mt-20  justify-center">
      <div class="text-6xl bg-gradient-to-r via-yellow-300 absolute m-20">
            congratulations!
      </div>
      <br />
      <Vue3Lottie :animationData="programmer" :height="200" :width="200" />
    </div>
  </main>
</template>
