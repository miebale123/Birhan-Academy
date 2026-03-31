<template>
  <div class="logo-wrap" aria-label="Birhan Academy">
    <div v-for="(letters, wordIndex) in words" :key="wordIndex" class="word-row">
      <span
        v-for="(letter, letterIndex) in letters"
        :key="`${wordIndex}-${letterIndex}`"
        class="letter-ball"
        :style="{
          '--delay': `${(wordIndex * 7 + letterIndex) * 0.08}s`,
          '--float-delay': `${0.9 + (wordIndex * 7 + letterIndex) * 0.08}s`,
        }"
      >
        {{ letter }}
      </span>
    </div>
  </div>
</template>

<script setup>
const words = ['ብርሃን', 'አካዳሚ'].map((word) => Array.from(word))
</script>

<style scoped>
.logo-wrap {
  display: flex;
  width: min(100%, 28rem);
  flex-direction: column;
  gap: clamp(0.5rem, 2vw, 1rem);
}

.word-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: clamp(0.35rem, 1.6vw, 0.75rem);
}

.letter-ball {
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(2.3rem, 9vw, 3.4rem);
  height: clamp(2.3rem, 9vw, 3.4rem);
  border-radius: 1rem;
  background: linear-gradient(180deg, #facc15 0%, #f59e0b 100%);
  color: #7f1d1d;
  font-size: clamp(1.15rem, 4.4vw, 1.75rem);
  font-weight: 900;
  box-shadow:
    0 18px 35px rgba(120, 53, 15, 0.32),
    inset 0 1px 0 rgba(255, 255, 255, 0.45);
  opacity: 0;
  transform: translate3d(clamp(38px, 10vw, 90px), -32px, 0) scale(0.72) rotate(12deg);
  animation:
    settle 0.9s cubic-bezier(0.2, 0.8, 0.22, 1) forwards,
    bob 4.8s ease-in-out infinite;
  animation-delay: var(--delay), var(--float-delay);
}

@keyframes settle {
  0% {
    opacity: 0;
    transform: translate3d(clamp(38px, 10vw, 90px), -32px, 0) scale(0.72) rotate(12deg);
  }
  65% {
    opacity: 1;
    transform: translate3d(0, 12px, 0) scale(1.04) rotate(-6deg);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
  }
}

@keyframes bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

@media (max-width: 480px) {
  .logo-wrap {
    width: min(100%, 18rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .letter-ball {
    opacity: 1;
    transform: none;
    animation: none;
  }
}
</style>
