<template>
  <VaConfig :colors="{ currentPresetName: 'landing' }">
    <div class="landing">
      <NuxtPage />
    </div>
  </VaConfig>
</template>

<script lang="ts" setup>
useHead({
  title: 'Vuestic UI — Vue 3 UI framework',
  link: [
    { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" },
  ]
})
</script>

<style lang="scss" scoped>
.landing {
  background: var(--va-background-secondary);
  color: var(--va-on-background-secondary)
}
</style>
