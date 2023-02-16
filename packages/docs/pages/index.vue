<template>
  <div class="landing">
    <div class="landing__preview-wrapper">
      <LandingHeader />
      <LandingPreview />
      <LandingPartners />
    </div>
    <LandingCustomize />
    <LandingSeamlessIntegration />
    <LandingOpenSource />
    <LandingAdmin />
    <LandingFooter />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'landing',
})

useHead({
  title: 'Vuestic UI — Vue 3 UI framework',
});
</script>

<style lang="scss">
@import "vuestic-ui/src/styles/typography/typography.scss";
@import "vuestic-ui/src/styles/smart-helpers/smart-helpers.scss";

.landing {
  font-family: Source Sans Pro;

  a {
    @include link(2px);
  }

  &__preview-wrapper {
    background-image: url("@/public/landing/pattern.svg");
    background-size: unset;
    background-repeat: no-repeat;
    background-position: top;
    background-color: var(--va-background-secondary);
  }
}
</style>
