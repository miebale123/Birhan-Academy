<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="text-sm rounded p-4 text-center"
    style="background: url(https://i.ibb.co/qCkd9jS/img1.jpg)"
  >
    <slot></slot>
    <div class="grid grid-cols-2 gap-2 text-sm mt-16">
      <div :class="Style">
        <img src="../Icons/calendar.svg" alt="" />
        <slot name="calendar"></slot>
      </div>
      <div :class="Style">
        <img src="../Icons/calendar.svg" alt="" />
        <slot name="instructor"></slot>
      </div>
      <div :class="Style">
        <img src="../Icons/calendar.svg" alt="" />
        <slot name="period"></slot>
      </div>

      <div :class="Style" class="bg-blue-500 text-white justify-center">
        <router-link to="/ContentView" class="flip">learn now</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  components: { RouterLink },
  data() {
    return {
      Style: 'bg-gray-400 rounded p-1 flex gap-2  h-8 items-center',
    }
  },
}
</script>

<style>
.flip{
  animation: flip ease-in-out  2s;
}
@keyframes flip {
  0% {
    transform: perspective(400px) rotateY(0);
  }
  50% {
    transform: perspective(400px) rotateY(180deg);
  }
  100% {
    transform: perspective(400px) rotateY(360deg);
  }
}
</style>
