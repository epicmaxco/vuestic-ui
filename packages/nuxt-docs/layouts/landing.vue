<template>
  <NuxtPage />
</template>

<script lang="ts" setup>
const { applyPreset } = useColors()

// TODO: Temp force light mode in landing
applyPreset('light')
</script>

<style lang="scss">
  // Need to import tailwind in layout, because otherwise Vuestic component's css will has a higher priority
  // @import '~/assets/css/tailwind.css';

  body {
    background: var(--va-background-secondary);
  }
</style>
