<template>
  <div class="landing">
    <LandingHeader v-model="isMobileMenuOpen" />
    <div v-show="!isMobileMenuOpen">
      <LandingPreview />
      <LandingPartners />
      <!-- <LandingBannersVuejsNation /> -->
      <LandingFeatures />
      <LandingCustomize />
      <LandingSeamlessIntegration />
      <LandingOpenSource />
      <LandingAdmin />
      <LandingFooter />
      <LazyLandingModalsRequestAuditModal v-if="needShowRequestAuditModal" v-model="showRequestAuditModal" @close="onRequestAuditModalShown" />
    </div>
  </div>
</template>

<script lang="ts" setup>

definePageMeta({
  layout: "landing",
  // See: https://github.com/nuxt/nuxt/issues/13309
  layoutTransition: true,
});

const { needShowRequestAuditModal, onRequestAuditModalShown, showRequestAuditModal } = useRequestAuditModal()

const isMobileMenuOpen = ref(false);
</script>

<style lang="scss">
@import "vuestic-ui/src/styles/typography/typography.scss";
@import "@/assets/variables.scss";
@import "@/assets/reset";

.landing {
  font-family: var(--va-font-family);

  a {
    @include link(2px);
  }
}
</style>
