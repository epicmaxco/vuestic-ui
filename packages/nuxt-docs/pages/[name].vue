<template>
  <!-- <div>{{ t('landing.preview.buttons.start') }}</div> -->
  <DocsPage />
</template>

<script setup lang="ts">
import DocsPage from '~/components/docs/DocsPage.vue'
const { t } = useI18n()
</script>