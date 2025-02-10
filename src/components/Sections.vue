<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="bg-gradient-to-r from-yellow-100 to-green-300">
    <section class="flex items-center justify-center h-[600px] gap-48">
      <div class="h-72">
        <vue3-lottie :animationData="clearContent"></vue3-lottie>
        <h2 class="text-center">{{ detail }}</h2>
      </div>
      <div class="h-72">
        <vue3-lottie :animationData="secure"></vue3-lottie>
        <p class="text-center">{{ detail }}</p>
      </div>
    </section>

    <svg viewBox="0 0 1440 200" class="fill-gray-300">
      <path
        d="M0,160C80,120,160,80,320,80C480,80,560,160,720,160C880,160,960,80,1120,50C1280,16,1360,80,1440,0L1440,320L0,320Z"
      ></path>
    </svg>
  </div>

  <section class="bg-gray-300 flex items-center justify-center h-[400px] gap-48">
    <p class="text-center">{{ detail }}</p>
    <div class="w-72">
      <!-- <vue3-lottie :animationData="collaborate"></vue3-lottie> -->
    </div>
  </section>
</template>

<script>
import secure from '@/assets/secure.json'
import clearContent from '@/assets/clearContent.json'
import { Vue3Lottie } from 'vue3-lottie'

export default {
  components: {
    Vue3Lottie,
  },

  data() {
    return {
      detail: 'description',
      secure,
      clearContent,
    }
  },
}
</script>
