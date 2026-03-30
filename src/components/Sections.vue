<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="section-shell">
    <svg viewBox="0 0 1440 200" class="h-12 w-full fill-black sm:h-16">
      <path d="M0,132C180,0,1360,160,1440,0L140,0L0,0Z"></path>
    </svg>

    <section class="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-14 sm:px-8 lg:gap-16">
      <div class="section-card section-card-light">
        <div class="copy-block">
          <p class="eyebrow text-sky-700">Digital confidence</p>
          <h2 class="text-3xl font-black text-slate-800 sm:text-4xl">
            Lessons that stay clear and welcoming on any screen
          </h2>
          <p class="section-text text-slate-700">
            ተምሃሮ ናይ ኮምፒዩተር ፍልጠት ንክቀስሙ ዝለዓለ ፃዕሪ ንገብር
          </p>
        </div>

        <div class="animation-frame">
          <vue3-lottie :animationData="programmer" width="100%" class="w-full" />
        </div>
      </div>
    </section>

    <svg viewBox="0 0 1440 200" class="h-12 w-full fill-gray-600 sm:h-16">
      <path
        d="M0,160C80,120,160,80,320,80C480,80,560,160,720,160C880,160,960,80,1120,50C1280,16,1360,80,1440,0L1440,320L0,320Z"
      ></path>
    </svg>
  </div>

  <section class="section-family">
    <div
      class="mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-10 px-6 py-14 sm:px-8 lg:flex-row lg:gap-16"
    >
      <div class="image-frame">
        <img :src="familyImage" alt="Family celebrating student progress" class="h-full w-full object-cover" />
      </div>

      <div class="copy-block text-center lg:text-left">
        <p class="eyebrow text-rose-200">Family pride</p>
        <h2 class="text-3xl font-black text-white sm:text-4xl">
          Progress that parents can see and celebrate
        </h2>
        <p class="section-text text-red-100">ወለዲ ብናይ ደቆም ጉብዝና ይሕጎሱ</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import familyImage from '@/assets/family.bmp'
import programmer from '@/assets/programmer.json'
import { Vue3Lottie } from 'vue3-lottie'
</script>

<style scoped>
.section-shell {
  background: linear-gradient(135deg, #dcfce7 0%, #bfdbfe 100%);
}

.section-card {
  display: grid;
  align-items: center;
  gap: clamp(2rem, 6vw, 4rem);
}

.section-card-light {
  padding-top: 0.5rem;
}

.copy-block {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.eyebrow {
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.28em;
  text-transform: uppercase;
}

.section-text {
  font-size: clamp(1.05rem, 2vw, 1.45rem);
  font-weight: 700;
  line-height: 1.75;
}

.animation-frame {
  width: min(100%, 26rem);
  margin: 0 auto;
  padding: clamp(0.75rem, 3vw, 1.5rem);
  border-radius: 1.75rem;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.15);
}

.section-family {
  background: linear-gradient(180deg, #4b5563 0%, #374151 100%);
}

.image-frame {
  width: min(100%, 28rem);
  overflow: hidden;
  border-radius: 1.75rem;
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.35);
}

@media (min-width: 1024px) {
  .section-card {
    grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.95fr);
  }
}
</style>
