<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="text-sm p-1 hover:-m-4">
    <slot></slot>
    <div class="bg-blue-500 text-white p-1 rounded-b shake">
      <router-link to="/Contents">learn now</router-link>
    </div>
  </div>
</template>

<style>
@keyframes shake {
  0%{font-size: 10px;}
  25%, 50%, 100%{font-size: 15px;}
  0% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(0.5deg);
  }
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-0.5deg);
  }
}
.shake {
  animation: shake 0.1s infinite;
  animation-delay: 2s; /* Pause for 2 seconds */
}
</style>
