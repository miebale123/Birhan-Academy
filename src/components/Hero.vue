<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import secure from '@/assets/secure.json'
import { Vue3Lottie } from 'vue3-lottie'
</script>

<template>
  <main>
    <div class="bg-black mt-20 h-screen">
      <div class="text-6xl absolute m-20">welcome!</div>
      <vue3-lottie :animationData="secure" />
    </div>
  </main>
</template>
