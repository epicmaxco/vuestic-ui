<route>
{
  "meta": {
    "layout": "landing"
  }
}
</route>

<template>
  <div class="landing">
    <div class="preview-wrapper">
      <Header />
      <Preview />
    </div>
    <SeamlessIntegration />
    <Customize />
    <OpenSource />
    <Admin />
    <Footer />
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { Options, Vue } from 'vue-class-component'
import Header from '../components/landing/Header.vue'
import Preview from '../components/landing/Preview.vue'
import Admin from '../components/landing/Admin.vue'
import Footer from '../components/landing/Footer.vue'
import OpenSource from '../components/landing/OpenSource.vue'
import SeamlessIntegration from '../components/landing/SeamlessIntegration/SeamlessIntegration.vue'
import Customize from '../components/landing/Customize.vue'

@Options({
  name: 'DocsLandingPage',
  components: {
    Header,
    Preview,
    Footer,
    OpenSource,
    Admin,
    SeamlessIntegration,
    Customize,
  },
})
export default class Landing extends Vue {}
</script>

<style lang="scss">
@import "~vuestic-ui/src/styles/resources";
//@import "./../assets/main";

.landing {
  font-family: Source Sans Pro;

  a:not(.va-button):focus {
    @include focus-outline(2px, 2px, 2px);
  }
}

.preview-wrapper {
  background-image: url("../assets/landing/images/pattern.svg");
  background-size: unset;
  background-repeat: no-repeat;
  background-position: top;
}
</style>
