<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="text-sm rounded p-2 pr-16 pl-16 h-80 text-center "

  >
    <slot></slot>
    <div class="grid grid-cols-2 gap-4  text-sm mt-32 font-bold">
      <div class="bg-gray-100 bg-opacity-40 rounded p-1 flex gap-4 h-8 w-40 items-center">
        <img src="../Icons/calendar.svg" alt="" />
        <slot name="calendar"></slot>
      </div>

      <div class="bg-gray-100 bg-opacity-20 rounded p-1 flex  h-8 justify-center items-center ">
        <slot name="grade"></slot>
      </div>

      <div class="bg-blue-500  text-white justify-center rounded flex h-8 items-center shake">
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
