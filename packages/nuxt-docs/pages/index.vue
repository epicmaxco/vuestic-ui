<template>
  <div class="landing">
    <div class="preview-wrapper">
      <Header />
      <Preview />
    </div>
    <SeamlessIntegration />
    <!-- <Customize /> -->
    <!-- <OpenSource /> -->
    <!-- <Admin /> -->
    <!-- <Footer /> -->
  </div>
</template>

<script setup lang="ts">
import Header from '../components/landing/header/Header.vue'
import Preview from '../components/landing/Preview.vue'
import SeamlessIntegration from '../components/landing/SeamlessIntegration/SeamlessIntegration.vue'
// import Customize from '../components/landing/Customize/Customize.vue'
// import Admin from '../components/landing/Admin.vue'
// import Footer from '../components/landing/Footer.vue'
// import OpenSource from '../components/landing/OpenSource.vue'

definePageMeta({ layout: 'landing' })
</script>

<style lang="scss">
// @import "~vuestic-ui/src/styles/resources";
// @import "resources/index.scss";
@import "~/assets/smart-grid.scss";
@import "~/assets/colors.scss";
@import "~/assets/fonts.scss";


.landing {
  font-family: Source Sans Pro;
}

.preview-wrapper {
  background-image: url("../assets/landing/images/pattern.svg");
  background-size: unset;
  background-repeat: no-repeat;
  background-position: top;
}
</style>
