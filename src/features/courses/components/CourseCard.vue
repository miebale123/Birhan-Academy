<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  to: {
    type: [String, Object],
    default: null,
  },
})

const componentTag = computed(() => (props.to ? RouterLink : 'article'))
const componentProps = computed(() => (props.to ? { to: props.to } : {}))
</script>

<template>
  <component
    :is="componentTag"
    v-bind="componentProps"
    :class="[
      'group block h-full rounded-[1.8rem] border border-sky-300/12 bg-[rgba(8,23,44,0.62)] p-4 shadow-[0_24px_70px_rgba(2,12,27,0.35)] backdrop-blur transition-transform duration-300 sm:p-5',
      to
        ? 'cursor-pointer hover:-translate-y-1 hover:border-sky-300/28 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-100/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950'
        : 'hover:-translate-y-1 hover:border-sky-300/28',
    ]"
  >
    <slot></slot>
  </component>
</template>
