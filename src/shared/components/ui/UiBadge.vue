<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md',
  },
  variant: {
    type: String,
    default: 'neutral',
  },
})

const classNames = computed(() => {
  return ['ui-badge', `ui-badge--${props.variant}`, `ui-badge--${props.size}`]
})
</script>

<template>
  <span :class="classNames">
    <slot></slot>
  </span>
</template>

<style scoped>
.ui-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid transparent;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  white-space: nowrap;
}

.ui-badge--sm {
  padding: 0.32rem 0.7rem;
  font-size: 0.68rem;
}

.ui-badge--md {
  padding: 0.38rem 0.85rem;
  font-size: 0.72rem;
}

.ui-badge--neutral {
  border-color: rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(248, 250, 252, 0.92);
}

.ui-badge--info {
  border-color: rgba(125, 211, 252, 0.22);
  background: rgba(186, 230, 253, 0.88);
  color: #082f49;
}

.ui-badge--success {
  border-color: rgba(167, 243, 208, 0.25);
  background: rgba(167, 243, 208, 0.92);
  color: #064e3b;
}

.ui-badge--warning {
  border-color: rgba(253, 230, 138, 0.25);
  background: rgba(253, 230, 138, 0.96);
  color: #78350f;
}
</style>
