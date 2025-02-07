<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <footer>
    <div class="bg-gray-400 text-white p-8 justify-end">
      <div class="flex items-center justify-center space-x-24">
        <img src="./" alt="Passion Academy" class="h-16" />
        <div v-for="section in footerSections" :key="section.id">
          <h2 class="underline underline-offset-8 font-bold mb-4">{{ section.title }}</h2>
          <ul>
            <li v-for="link in section.links" :key="link">
              {{ link }}
            </li>
          </ul>
        </div>
      </div>
      <h2 class="text-right mr-28">follow us on</h2>
      <div class="flex">
        <h2 class="ml-16">©2025 mekelle university Co., Ltd. All rights reserved.</h2>
        <div class="flex gap-2 pb-8 ml-auto pr-28">
          <img src="" alt="" />
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      footerSections: [
        {
          title: 'Links',
          links: ['About', 'related', 'Learn More'],
          id: 1,
        },

        {
          title: 'Support',
          links: ['Getting Started', 'Contact', 'FAQ'],
          id: 2,
        },
        {
          title: 'Legal',
          links: ['Privacy Policy', 'Terms and Conditions', 'Cookie Policy'],
          id: 3,
        },
      ],
    }
  },
}
</script>

<style>
li {
  font-weight: 100;
}
</style>
