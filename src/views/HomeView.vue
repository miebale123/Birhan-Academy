<template>
  <div class="bg-black">
    <Hero />
    <Sections />
  </div>
</template>

<script>
import Hero from '@/components/hero.vue'
import Sections from '@/components/Sections.vue'

export default {
  components: { Hero, Sections, },
}
</script>
