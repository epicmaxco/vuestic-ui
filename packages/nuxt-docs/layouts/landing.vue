<template>
  <NuxtPage />
</template>

<script lang="ts" setup>
const { applyPreset } = useColors()

// TODO: Temp force light mode in landing
applyPreset('light')
</script>

<style lang="scss">
  body {
    background: var(--va-background-secondary);
  }
</style>
