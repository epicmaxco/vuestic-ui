<script setup lang="ts">
  import PartnersList from './partners/PartnersList.vue';
</script>

<template>
  <section class="partners">
    <PartnersList />
  </section>
</template>
<style lang="scss" scoped>
@import "@/assets";

.partners {
  $section-padding: 2.5rem 0 3.5rem;
  $section-xs-padding: 1rem 0 2.5rem;

  width: 100%;
  position: relative;
  padding: $section-padding;
  color: var(--va-text-inverted);
  background-color: var(--bg-partners);
}
</style>
