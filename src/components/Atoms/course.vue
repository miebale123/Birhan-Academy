<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="text-sm rounded-xl pr-2 pt-1 hover:-m-6">
    <slot></slot>
    <div class="flex justify-around mt-60 font-bold">
      <div class="bg-gray-100 bg-opacity-40 rounded p-1 flex h-8 w-32 items-center">
        <img src="../Icons/calendar.svg" alt="" />
      </div>

      <div class="bg-blue-500 text-white rounded-lg p-2 shake ">
        <router-link to="/ContentView" class="">learn now</router-link>
      </div>
    </div>
  </div>
</template>

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
  animation: shake 0.25s infinite;
  animation-delay: 2s; /* Pause for 2 seconds */
}
</style>
