<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div
    class="bg-gradient-to-r from-green-100 to-blue-400 text-gray-600 font-bold text-2xl break-words"
  >
    <svg viewBox="0 0 1440 200" class="fill-black">
      <path d="M0,132C180,0,1360,160,1440,0L140,0L0,0Z"></path>
    </svg>
    <section class="flex items-center justify-center h-[400px] gap-20">
      <div class="h-72">
        <vue3-lottie :animationData="childFriendly"></vue3-lottie>
        <h2>The contents are appropriate and engaging for children</h2>
      </div>
      <div class="h-72">
        <vue3-lottie :animationData="secure"></vue3-lottie>
        <p>Our website takes security one step further</p>
      </div>
    </section>

    <svg viewBox="0 0 1440 200" class="fill-gray-600">
      <path
        d="M0,160C80,120,160,80,320,80C480,80,560,160,720,160C880,160,960,80,1120,50C1280,16,1360,80,1440,0L1440,320L0,320Z"
      ></path>
    </svg>
  </div>
  <section
    class="bg-gray-600 flex items-center justify-center h-[400px] gap-20 text-red-200 font-bold text-3xl break-words whitespace-normal"
  >
    <div class="flex items-center justify-center">
      <p class="mr-20">ወለዲ ብናይ ደቆም ጉብዝና ይሕጎሱ።</p>
      <img :src="family" alt="" class="rounded-3xl h-[300px]" />
    </div>
  </section>
</template>

<script>
import family from '@/assets/family.bmp'
import secure from '@/assets/secure.json'
import childFriendly from '@/assets/child-friendly.json'

import { Vue3Lottie } from 'vue3-lottie'

export default {
  components: {
    Vue3Lottie,
  },

  data() {
    return {
      childFriendly,
      secure,
      family,
    }
  },
}
</script>
