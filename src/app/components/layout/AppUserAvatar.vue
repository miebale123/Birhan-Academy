<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'md',
  },
})

const initial = computed(() => {
  const normalizedName = props.name.trim()
  return normalizedName ? normalizedName.charAt(0).toUpperCase() : '?'
})
</script>

<template>
  <span :class="['app-user-avatar', `app-user-avatar--${size}`]" :aria-label="name || 'User avatar'">
    {{ initial }}
  </span>
</template>

<style scoped>
.app-user-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: linear-gradient(180deg, #f8cc45 0%, #f59e0b 100%);
  color: #0f172a;
  font-weight: 900;
  box-shadow: 0 10px 22px rgba(245, 158, 11, 0.2);
}

.app-user-avatar--sm {
  width: 2rem;
  height: 2rem;
  font-size: 0.85rem;
}

.app-user-avatar--md {
  width: 2.2rem;
  height: 2.2rem;
  font-size: 0.95rem;
}

.app-user-avatar--lg {
  width: 2.65rem;
  height: 2.65rem;
  font-size: 1rem;
}
</style>
