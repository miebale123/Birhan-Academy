<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="ml-1 mr-1 mt-[20px]">
    <div class="ml-2.5">
      <div
        class="-ml-[5px] w-[20px] h-[40px] rounded-[50%_50%_35%_35%] bg-gradient-to-t from-[lightblue] via-[yellow] to-white shadow-[0_0_25px_5px_orange] origin-bottom animate-glowNshrink"
      ></div>
      <div
        class="-mt-[22px] w-[10px] h-[20px] rounded-[50%_50%_35%_35%] bg-blue-500 origin-bottom animate-glowNshrink"
      ></div>
    </div>
    <div
      class="w-8 h-10 bg-gradient-to-r from-yellow-200 via-[white] to-blue-300 rounded-[50px/20px]"
    ></div>
  </div>
</template>

<style>
@keyframes glowNshrink {
  20% {
    transform: scaleY(1.1) rotateZ(15deg);
  }
  40% {
    transform: scaleY(1.2) rotateZ(10deg);
  }
  70% {
    transform: scaleY(0.9) rotateZ(-10deg);
  }
  90% {
    transform: scaleY(0.95) rotateZ(-5deg);
  }
  100% {
    transform: scaleY(1) rotateZ(10deg);
  }
}

@keyframes blink {
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0.2;
  }
}

.animate-glowNshrink {
  animation: glowNshrink 15s infinite;
}

.animate-blink {
  animation: blink 0.2s infinite;
}
</style>
