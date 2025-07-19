<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <footer class="bg-gray-500 text-white py-10">
    <div class=" p-4 justify-around ">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left p-8">
        <div>
          <h3 class="font-bold text-lg mb-4 text-blue-400">Links</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/about" class="hover:text-blue-200 transition-colors duration-300"
                >About Us</router-link
              >
            </li>
            <li>
              <router-link
                to="/learn_more"
                class="hover:text-blue-200 transition-colors duration-300"
                >Learn More</router-link
              >
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold text-lg mb-4 text-blue-400">Support</h3>
          <ul class="space-y-2">
            <li>
              <router-link
                to="/contact_us"
                class="hover:text-blue-200 transition-colors duration-300"
                >Contact Us</router-link
              >
            </li>
            <li>
              <router-link to="/FAQ" class="hover:text-blue-200 transition-colors duration-300"
                >FAQ</router-link
              >
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold text-lg mb-4 text-blue-400">Legal</h3>
          <ul class="space-y-2">
            <li>
              <router-link
                to="/Privacy_Policy"
                class="hover:text-blue-200 transition-colors duration-300"
                >Privacy Policy</router-link
              >
            </li>
            <li>
              <router-link
                to="/Terms_and_Conditions"
                class="hover:text-blue-200 transition-colors duration-300"
                >Terms & Conditions</router-link
              >
            </li>
          </ul>
        </div>
      </div>

      <hr class="border-gray-700 my-8" />

      <div class="flex flex-col md:flex-row items-center justify-around text-sm">
        <p class="mb-4 md:mb-0">&copy;2025 Light Academy Co., Ltd. All rights reserved.</p>
        <div class="flex items-center space-x-4">
          <p>Follow Us On:</p>
          <a href="#" class="text-white hover:text-blue-400 transition-colors duration-300">
            facebook
          </a>
          <a href="#" class="text-white hover:text-blue-400 transition-colors duration-300">
            X
          </a>
          <a href="#" class="text-white hover:text-blue-400 transition-colors duration-300">
            instagram
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
