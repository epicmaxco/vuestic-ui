<template>
  <NuxtPage />
</template>

<script lang="ts" setup>
import { useColors } from 'vuestic-ui'

const { applyPreset } = useColors()

applyPreset('landing')

useHead({
  title: 'Vuestic UI — Vue 3 UI framework',
  link: [
    { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" },
  ]
})
</script>

<style lang="scss">
// Need to import tailwind in layout, because otherwise Vuestic component's css will has a higher priority
// @import '~/assets/css/tailwind.css';

body {
  background: var(--va-background-secondary);
}
</style>
