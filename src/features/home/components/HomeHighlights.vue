<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import programmerAnimation from '@/assets/animations/programmer.json'
import familyImage from '@/assets/images/home/family.bmp'
import { homeCopy } from '@/features/home/constants/homeCopy'

const copy = homeCopy.highlights
</script>

<template>
  <div class="section-shell">
    <svg
      viewBox="0 0 1440 200"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
      class="section-divider section-divider-dark"
    >
      <path d="M0,132C180,0,1360,160,1440,0L140,0L0,0Z"></path>
    </svg>

    <section class="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-14 sm:px-8 lg:gap-16">
      <div class="section-card section-card-light">
        <div class="copy-block">
          <p class="eyebrow text-sky-700">{{ copy.intro.eyebrow }}</p>
          <h2 class="text-3xl font-black text-slate-800 sm:text-4xl">
            {{ copy.intro.title }}
          </h2>
          <p class="section-copy text-slate-700">
            {{ copy.intro.description }}
          </p>

          <div class="grid gap-4 sm:grid-cols-3">
            <article
              v-for="pillar in copy.intro.learningPillars"
              :key="pillar.title"
              class="info-card"
            >
              <h3 class="text-lg font-bold text-slate-900">{{ pillar.title }}</h3>
              <p class="mt-2 text-sm leading-6 text-slate-700">{{ pillar.description }}</p>
            </article>
          </div>
        </div>

        <div class="animation-frame">
          <Vue3Lottie :animationData="programmerAnimation" width="100%" class="w-full" />
        </div>
      </div>
    </section>
  </div>

  <section class="section-family">
    <div
      class="mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-10 px-6 py-14 sm:px-8 lg:flex-row lg:gap-16"
    >
      <div class="image-frame">
        <img :src="familyImage" :alt="copy.family.imageAlt" class="h-full w-full object-cover" />
      </div>

      <div class="copy-block text-center lg:text-left">
        <p class="eyebrow text-amber-200">{{ copy.family.eyebrow }}</p>
        <h2 class="text-3xl font-black text-white sm:text-4xl">
          {{ copy.family.title }}
        </h2>
        <!-- <p class="section-translation text-red-100">ወለዲ ብናይ ደቆም ጉብዝና ይሕጎሱ</p> -->

        <div class="grid gap-3 sm:grid-cols-2">
          <article v-for="benefit in copy.family.benefits" :key="benefit" class="family-card">
            {{ benefit }}
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-shell {
  background: radial-gradient(circle at top right, rgba(56, 189, 248, 0.2), transparent 28%),
    linear-gradient(135deg, #f8fbff 0%, #d7ebff 100%);
}

.section-divider {
  display: block;
  width: 100%;
  height: clamp(3rem, 8vw, 4rem);
  flex-shrink: 0;
  margin-top: -1px;
  margin-bottom: -1px;
}

.section-divider-dark {
  fill: #020617;
}

.section-divider-muted {
  fill: #475569;
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

.section-copy {
  font-size: clamp(1rem, 1.9vw, 1.25rem);
  line-height: 1.8;
}

.section-translation {
  font-size: 1rem;
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

.info-card {
  border-radius: 1.5rem;
  border: 1px solid rgba(148, 163, 184, 0.22);
  background: rgba(255, 255, 255, 0.68);
  padding: 1.1rem;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
}

.section-family {
  background: radial-gradient(circle at top left, rgba(251, 191, 36, 0.16), transparent 20%),
    linear-gradient(180deg, #22324a 0%, #101a2a 100%);
}

.image-frame {
  width: min(100%, 28rem);
  overflow: hidden;
  border-radius: 1.75rem;
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.35);
}

.family-card {
  border-radius: 1.35rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.07);
  padding: 1rem 1.1rem;
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(226, 232, 240, 0.96);
}

@media (min-width: 1024px) {
  .section-card {
    grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.95fr);
  }
}
</style>
