<template>
  <div>
    <docs-content :config="config" />
  </div>
</template>

<script lang="ts" setup>
import { config } from '@/page-configs/getting-started/kitchensink/page-config'
import DocsContent from '@/components/DocsContent.vue'
</script>
