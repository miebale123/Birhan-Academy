<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  to: {
    type: [String, Object],
    default: null,
  },
})
</script>

<template>
  <RouterLink
    v-if="to"
    :to="to"
    class="course-card course-card--interactive group h-full sm:p-5"
  >
    <slot></slot>
  </RouterLink>
  <article v-else class="course-card group h-full sm:p-5">
    <slot></slot>
  </article>
</template>

<style scoped>
.course-card {
  display: block;
  border-radius: 1.8rem;
  border: 1px solid rgba(125, 211, 252, 0.12);
  background: rgba(8, 23, 44, 0.62);
  padding: 1.25rem;
  box-shadow: 0 24px 70px rgba(2, 12, 27, 0.35);
  backdrop-filter: blur(12px);
  transition:
    transform 200ms ease,
    border-color 200ms ease,
    box-shadow 200ms ease;
}

.course-card--interactive:hover {
  transform: translateY(-4px);
  border-color: rgba(125, 211, 252, 0.28);
}

.course-card--interactive:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 3px rgba(186, 230, 253, 0.25),
    0 24px 70px rgba(2, 12, 27, 0.35);
}
</style>
