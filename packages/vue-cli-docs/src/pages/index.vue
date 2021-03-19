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
    <Seamless />
    <Customize />
    <OpenSource />
    <Admin />
    <Footer />
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { Options, Vue, setup } from 'vue-class-component'
import Header from '@/components/landing/Header.vue'
import Preview from '@/components/landing/Preview.vue'
import Admin from '@/components/landing/Admin.vue'
import Footer from '@/components/landing/Footer.vue'
import OpenSource from '@/components/landing/OpenSource.vue'
import Seamless from '@/components/landing/Seamless.vue'
import Customize from '@/components/landing/Customize.vue'

@Options({
  components: {
    Header,
    Preview,
    Footer,
    OpenSource,
    Admin,
    Seamless,
    Customize,
  },
} as any)
export default class Landing extends Vue {}
</script>

<style lang="scss">
@import "~vuestic-ui-dev/src/components/vuestic-sass/resources/resources.scss";
@import "./../assets/main";

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
