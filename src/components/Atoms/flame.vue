<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!-- <div class="p-2 flex-col items-center border border-green-500 text-white disabled"> -->
    <!-- <div class="relative flex jutify-center">
      <div
        class="w-[2vw] h-[8vh] rounded-[50%_50%_35%_35%] bg-gradient-to-t from-[lightblue] via-[yellow] to-white shadow-[0_0_2vw_0.5vw_orange] origin-bottom animate-glowNshrink"
      ></div>
      <div
        class="absolute top-[50%] w-[1vw] h-[3vh] bg-blue-500 rounded-[50%_50%_35%_35%] animate-glowNshrinkInside"
      ></div>
    </div>
    <div
      class="w-[6vw] h-[10vh] bg-gradient-to-r from-yellow-200 via-white to-blue-300 rounded-[50px/20px] mt-[-1vh]"
    ></div> -->
  <div></div>
</template>
s
<style>
@keyframes glowNshrink {
  20% {
    transform: rotateZ(10deg);
  }
  50% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(-10deg);
  }
}

.animate-glowNshrink {
  animation: glowNshrink 5s infinite;
}
.animate-glowNshrinkInside {
  animation: glowNshrink 5s infinite;
}

@media screen and (max-width: 600px) {
  div.disabled {
    display: none;
  }
}
</style>
