<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="text-sm rounded p-4 text-center pr-20"
    style="background: url(https://i.ibb.co/qCkd9jS/img1.jpg)"
  >
    <slot></slot>
    <div class="grid grid-cols-2 gap-2 text-sm mt-16">
      <div class="bg-gray-400 rounded p-1 flex gap-2 h-8 items-center">
        <img src="../Icons/calendar.svg" alt="" />
        <slot name="calendar"></slot>
      </div>

      <div class="bg-gray-400 rounded p-1 flex gap-2 h-8 justify-center">
        <slot name="period"></slot>
      </div>

      <div class="bg-blue-500 text-white justify-center rounded flex h-8 items-center shake">
        <router-link to="/ContentView" class="">learn now</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  components: { RouterLink },
}
</script>

<style>
@keyframes shake {
  0% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(3deg);
  }
  50% {
    transform: rotate(-3deg);
  }
  75% {
    transform: rotate(3deg);
  }
  100% {
    transform: rotate(0);
  }
}
.shake {
  animation: shake 0.5s infinite;
  animation-delay: 2s; /* Pause for 2.5 seconds */
}
</style>
