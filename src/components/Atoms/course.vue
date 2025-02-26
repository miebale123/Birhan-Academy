<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="text-sm pr-2 pt-1 hover:-m-4">
    <slot></slot>
    <div class="bg-blue-500 text-white p-1 rounded shake">
      <router-link to="/Contents">learn now</router-link>
    </div>
  </div>
</template>

<style>
@keyframes shake {
  0% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(1deg);
  }
  50% {
    transform: rotate(-1deg);
  }
  75% {
    transform: rotate(1deg);
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
