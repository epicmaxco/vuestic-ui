<template>
  <div>
    <VaConfig :colors="{ currentPresetName: 'landing' }">
      <div class="landing">
        <NuxtPage />
      </div>
    </VaConfig>
  </div>
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
  --bg-header: var(--va-header);
  --bg-preview-1: var(--va-preview-1);
  --bg-preview-2: var(--va-preview-2);
  --bg-partners: var(--va-partners);
  --bg-customize-1: var(--va-customize-1);
  --bg-customize-2: var(--va-customize-2);
  --bg-seamless: var(--va-seamless);
  --bg-admin: var(--va-admin);

  --header-height: 4rem;
  --header-z-index: 2000;
  background: var(--va-background-secondary);
  color: var(--va-on-background-secondary)
}
</style>
