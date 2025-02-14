<template>
  <HeaderC />
  <router-view></router-view>
  <FooterC />
  <!-- <ContentsView /> -->
</template>

<script>
import { RouterView } from 'vue-router'
import HeaderC from './components/HeaderC.vue'
import FooterC from './components/footerC.vue'
// import ContentsView from './views/ContentsView.vue'

export default {
  components: { RouterView, HeaderC, FooterC },
  // components: { ContentsView },
}
</script>
