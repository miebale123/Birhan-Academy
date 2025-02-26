<template>
  <HeaderC />
  <router-view></router-view>
  <FooterC />
</template>

<script>
import { RouterView } from 'vue-router'
import HeaderC from './components/HeaderC.vue'
import FooterC from './components/footerC.vue'

export default {
  components: { RouterView, HeaderC, FooterC },
}
</script>
