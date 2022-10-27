<template>
  <div class="d-flex team-banner flex-wrap">
    <landing-epicmax-banner />
  </div>
</template>

<script setup lang="ts">
import LandingEpicmaxBanner from '@/components/landing/LandingEpicmaxBanner.vue'
</script>

<style lang="scss">
$gap: 1rem;

.docs-team {
  margin: 0 -$gap;
}

.team-banner .epicmax__banner-content {
  width: 100%;
  margin-top: 2rem;
}
</style>
