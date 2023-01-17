<template>
  <div class="landing">
    <div class="landing__preview-wrapper">
      <LandingHeader />
      <!-- <LandingPreview />
      <LandingPartners /> -->
    </div>
    <!-- <LandingCustomize />
    <SeamlessIntegration />
    <LandingOpenSource />
    <LandingAdmin />
    <LandingFooter /> -->
  </div>
</template>

<script lang="ts" setup>
// import LandingHeader from "../components/landing/LandingHeader.vue";
// import LandingPreview from "../components/landing/LandingPreview.vue";
// import LandingPartners from "../components/landing/LandingPartners.vue";
// import LandingAdmin from "../components/landing/LandingAdmin.vue";
// import LandingFooter from "../components/landing/LandingFooter.vue";
// import LandingOpenSource from "../components/landing/LandingOpenSource.vue";
// import SeamlessIntegration from "../components/landing/SeamlessIntegration/SeamlessIntegration.vue";
// import LandingCustomize from "../components/landing/LandingCustomize.vue";

definePageMeta({
  layout: 'landing',
})
</script>

<style lang="scss">
@import "vuestic-ui/src/styles/typography/typography.scss";

.landing {
  font-family: Source Sans Pro;

  a {
    @include link(2px);
  }

  &__preview-wrapper {
    background-image: url("@/assets/images/landing/pattern.svg");
    background-size: unset;
    background-repeat: no-repeat;
    background-position: top;
    background-color: var(--va-background-secondary);
  }
}
</style>
