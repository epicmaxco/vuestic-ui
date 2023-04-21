<template>
  <div class="landing">
    <LandingHeader v-model="isMobileMenuOpen" />
    <div v-show="!isMobileMenuOpen">
      <LandingPreview />
      <LandingPartners />
      <LandingBannersVuejsForgeConference />
      <LandingFeatures />
      <LandingCustomize />
      <LandingSeamlessIntegration />
      <LandingOpenSource />
      <LandingAdmin />
      <LandingFooter />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'landing',
})

const isMobileMenuOpen = ref(false)
</script>

<style lang="scss">
@import "vuestic-ui/src/styles/typography/typography.scss";
@import "@/assets/variables.scss";

.landing {
  font-family: Source Sans Pro;

  a {
    @include link(2px);
  }
}
</style>
