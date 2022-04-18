<template>
  <div>
    <DocsPage />
  </div>
</template>

<script setup lang="ts">
import DocsPage from '~/components/docs/DocsPage.vue'
const { t } = useI18n()

// TODO: Nuxt don't change layout after nuxt link click for some reason.
//       Investigate or create bug report!
definePageMeta({ layout: 'default' })
</script>