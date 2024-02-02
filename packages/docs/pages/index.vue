<template>
  <div class="landing">
    <LandingHeader v-model="isMobileMenuOpen" />
    <div v-show="!isMobileMenuOpen">
      <LandingPreview />
      <LandingPartners />
      <LandingBannersVuejsNation />
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
  // See: https://github.com/nuxt/nuxt/issues/13309
  layoutTransition: true,
})

const isMobileMenuOpen = ref(false)
</script>

<style lang="scss">
@import "vuestic-ui/src/styles/typography/typography.scss";
@import "@/assets/variables.scss";

.landing {
  font-family: var(--va-font-family);

  a {
    @include link(2px);
  }
}
</style>
