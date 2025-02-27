<template>
  <Hero />
  <Sections />
</template>

<script setup>
import Hero from '@/components/Hero.vue'
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

const Sections = defineAsyncComponent({
  loader: () => import('@/components/Sections.vue'),
  hydrate: hydrateOnVisible(),
})
</script>
