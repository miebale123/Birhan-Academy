<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="bg-gradient-to-r from-green-100 to-blue-400 text-gray-600 font-bold text-2xl">
    <svg viewBox="0 0 1440 200" class="fill-black">
      <path d="M0,132C180,0,1360,160,1440,0L140,0L0,0Z"></path>
    </svg>

    <section
      class="flex flex-col md:flex-row justify-center items-center md:h-[400px] gap-10 md:gap-20 p-4"
    >
      <vue3-lottie :animationData="content" />
      <vue3-lottie :animationData="secure" />
    </section>

    <svg viewBox="0 0 1440 200" class="fill-gray-500">
      <path
        d="M0,160C80,120,160,80,320,80C480,80,560,160,720,160C880,160,960,80,1120,50C1280,16,1360,80,1440,0L1440,320L0,320Z"
      ></path>
    </svg>
  </div>

  <section
    class="bg-gray-500 flex flex-col md:flex-row items-center justify-center md:h-[400px] gap-10 md:gap-20 text-red-200 font-bold text-xl md:text-3xl p-4"
  >
    <div class="flex flex-col md:flex-row items-center text-center md:text-left">
      <p class="md:mr-10 mb-4 md:mb-0">ወለዲ ብናይ ደቆም ጉብዝና ይሕጎሱ።</p>
      <img
        src="../assets/family.bmp"
        alt="A family representation"
        class="rounded-3xl h-[200px] md:h-[300px]"
      />
    </div>
  </section>
</template>

<script setup>
import secure from '@/assets/secure.json'
import content from '@/assets/content.json'
import { Vue3Lottie } from 'vue3-lottie'
</script>
