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
      <LandingHeader />
      <LandingPreview />
      <LandingPartners />
    </div>
    <LandingCustomize />
    <SeamlessIntegration />
    <LandingOpenSource />
    <LandingAdmin />
    <LandingFooter />
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { Options, Vue } from 'vue-class-component'
import LandingHeader from '../components/landing/LandingHeader.vue'
import LandingPreview from '../components/landing/LandingPreview.vue'
import LandingPartners from '../components/landing/LandingPartners.vue'
import LandingAdmin from '../components/landing/LandingAdmin.vue'
import LandingFooter from '../components/landing/LandingFooter.vue'
import LandingOpenSource from '../components/landing/LandingOpenSource.vue'
import SeamlessIntegration from '../components/landing/SeamlessIntegration/SeamlessIntegration.vue'
import LandingCustomize from '../components/landing/LandingCustomize.vue'

@Options({
  name: 'DocsLandingPage',
  components: {
    LandingHeader,
    LandingPreview,
    LandingPartners,
    LandingFooter,
    LandingOpenSource,
    LandingAdmin,
    SeamlessIntegration,
    LandingCustomize,
  },
})
export default class Landing extends Vue {}
</script>

<style lang="scss">
@import "~vuestic-ui/src/styles/typography/typography.scss";
//@import "./../assets/main";

.landing {
  font-family: Source Sans Pro;

  a {
    @include link(2px);
  }
}

.preview-wrapper {
  background-image: url("../assets/landing/images/pattern.svg");
  background-size: unset;
  background-repeat: no-repeat;
  background-position: top;
}
</style>
