<template>
  <footer class="text-white ">
    <div class="p-16 justify-end">
      <div class="flex items-center justify-center space-x-24">
        <div class="flex items-center space-x-8">
          <img src="./Icons/graduate.svg" alt="birhan Academy" class="h-16" />
          <p>birhan academy</p>
        </div>
        <div class="grid grid-col-1 gap-4">
          <p class="font-bold">Links</p>
          <router-link to="/about">about </router-link>
          <router-link to="/learn_more">learn more</router-link>
        </div>
        <div class="grid grid-col-1 gap-4">
          <p class="font-bold">Support</p>
          <router-link to="/contact_us">contact us</router-link>
          <router-link to="/FAQ">FAQ</router-link>
        </div>
        <div class="grid grid-col-1 gap-4">
          <p class="font-bold">Legal</p>
          <router-link to="/Privacy_Policy">Privacy_Policy</router-link>
          <router-link to="/Terms_and_Conditions">Terms and Conditions</router-link>
        </div>
      </div>
    </div>
    <div class="flex justify-around">
      <h2>©2025 birhan academy Co., Ltd. All rights reserved.</h2>
      <h2>follow us on</h2>
    </div>
    <!-- the images are facebook, insta, telegram and X -->
        <!-- <img src="" alt="" /> -->
  </footer>
</template>
