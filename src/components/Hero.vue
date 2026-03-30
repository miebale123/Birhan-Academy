<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Logo from '@/components/logo.vue'
</script>

<template>
  <section class="hero-shell relative overflow-hidden text-white">
    <div class="pointer-events-none absolute inset-0">
      <div class="hero-aurora hero-aurora-left"></div>
      <div class="hero-aurora hero-aurora-right"></div>
    </div>

    <div
      class="relative z-10 mx-auto flex min-h-[calc(100vh-4.5rem)] w-full max-w-6xl flex-col justify-center gap-10 px-6 py-16 sm:px-8 lg:flex-row lg:items-center lg:justify-between"
    >
      <div class="max-w-2xl text-center lg:text-left">
        <p class="text-sm font-semibold uppercase tracking-[0.45em] text-amber-200/80 sm:text-base">
          Welcome to
        </p>

        <h1 class="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-7xl">
          Birhan Academy
        </h1>

        <p class="mt-5 text-sm leading-7 text-amber-50/80 sm:text-base lg:max-w-xl lg:text-lg">
          We help students grow digital confidence with a warmer kind of learning experience,
          now tuned to fit cleanly across phones, tablets, and large screens.
        </p>
      </div>

      <div class="hero-stage w-full max-w-[30rem] self-center">
        <div class="holder">
          <div class="candle">
            <div class="blinking-glow"></div>
            <div class="thread"></div>
            <div class="glow"></div>
            <div class="flame"></div>
          </div>
        </div>

        <Logo />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-shell {
  background:
    radial-gradient(circle at top, rgba(255, 183, 3, 0.22), transparent 35%),
    linear-gradient(180deg, #05060a 0%, #090d17 55%, #05060a 100%);
}

.hero-aurora {
  position: absolute;
  border-radius: 9999px;
  filter: blur(90px);
  opacity: 0.55;
}

.hero-aurora-left {
  top: 10%;
  left: -10%;
  width: clamp(220px, 32vw, 380px);
  height: clamp(220px, 32vw, 380px);
  background: rgba(251, 191, 36, 0.24);
}

.hero-aurora-right {
  right: -8%;
  bottom: 6%;
  width: clamp(240px, 34vw, 420px);
  height: clamp(240px, 34vw, 420px);
  background: rgba(59, 130, 246, 0.18);
}

.hero-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 1rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 2rem;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(8px);
}

.holder {
  --candle-width: clamp(72px, 18vw, 100px);
  --candle-height: calc(var(--candle-width) * 2);
  width: calc(var(--candle-width) * 1.55);
  height: calc(var(--candle-height) + clamp(60px, 10vw, 120px));
  position: relative;
}

.holder *,
.holder *:before,
.holder *:after {
  position: absolute;
  content: '';
}

.candle {
  bottom: 0;
  left: 50%;
  width: var(--candle-width);
  height: var(--candle-height);
  transform: translateX(-50%);
  border-radius: 150px / 40px;
  box-shadow:
    inset 20px -30px 50px 0 rgba(0, 0, 0, 0.4),
    inset -20px 0 50px 0 rgba(0, 0, 0, 0.4);
  background: #190f02;
  background: linear-gradient(#e48825, #e78e0e, #833c03, #4c1a03 50%, #1c0900);
}

.candle:before {
  width: 100%;
  height: calc(var(--candle-width) * 0.4);
  border-radius: 50%;
  border: 2px solid #d47401;
  background: #b86409;
  background: radial-gradient(#eaa121, #8e4901 45%, #b86409 80%);
}

.candle:after {
  width: calc(var(--candle-width) * 0.34);
  height: calc(var(--candle-width) * 0.1);
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  top: calc(var(--candle-width) * 0.14);
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5);
  background: radial-gradient(rgba(0, 0, 0, 0.6), transparent 45%);
}

.thread {
  width: calc(var(--candle-width) * 0.06);
  height: calc(var(--candle-width) * 0.36);
  top: calc(var(--candle-width) * -0.17);
  left: 50%;
  z-index: 1;
  border-radius: 40% 40% 0 0;
  transform: translateX(-50%);
  background: #121212;
  background: linear-gradient(#d6994a, #4b232c, #121212, black, #e8bb31 90%);
}

.flame {
  width: calc(var(--candle-width) * 0.24);
  height: calc(var(--candle-width) * 1.2);
  left: 50%;
  transform-origin: 50% 100%;
  transform: translateX(-50%);
  bottom: 100%;
  border-radius: 50% 50% 20% 20%;
  background: rgba(255, 255, 255, 1);
  background: linear-gradient(white 80%, transparent);
  animation:
    moveFlame 6s linear infinite,
    enlargeFlame 5s linear infinite;
}

.flame:before {
  width: 100%;
  height: 100%;
  border-radius: 50% 50% 20% 20%;
  box-shadow:
    0 0 15px 0 rgba(247, 93, 0, 0.4),
    0 -6px 4px 0 rgba(247, 128, 0, 0.7);
}

@keyframes moveFlame {
  0%,
  100% {
    transform: translateX(-50%) rotate(-2deg);
  }
  50% {
    transform: translateX(-50%) rotate(2deg);
  }
}

@keyframes enlargeFlame {
  0%,
  100% {
    height: calc(var(--candle-width) * 1.2);
  }
  50% {
    height: calc(var(--candle-width) * 1.4);
  }
}

.glow {
  width: calc(var(--candle-width) * 0.26);
  height: calc(var(--candle-width) * 0.6);
  border-radius: 50% 50% 35% 35%;
  left: 50%;
  top: calc(var(--candle-width) * -0.48);
  transform: translateX(-50%);
  background: rgba(0, 133, 255, 0.7);
  box-shadow:
    0 -40px 30px 0 #dc8a0c,
    0 40px 50px 0 #dc8a0c,
    inset 3px 0 2px 0 rgba(0, 133, 255, 0.6),
    inset -3px 0 2px 0 rgba(0, 133, 255, 0.6);
}

.glow:before {
  width: 70%;
  height: 60%;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.35);
}

.blinking-glow {
  width: var(--candle-width);
  height: calc(var(--candle-width) * 1.8);
  left: 50%;
  top: -55%;
  transform: translateX(-50%);
  border-radius: 50%;
  background: #ff6000;
  filter: blur(clamp(28px, 6vw, 60px));
  animation: blinkIt 0.1s infinite;
}

@keyframes blinkIt {
  50% {
    opacity: 0.8;
  }
}

@media (max-width: 640px) {
  .hero-stage {
    padding: 1.25rem 0.85rem 0.75rem;
    border-radius: 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-aurora,
  .flame,
  .blinking-glow {
    animation: none;
  }
}
</style>
