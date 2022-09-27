<template>
  <docs-content :config="configComputed" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

import DocsContent from '../../components/DocsContent.vue'
import virtualScrollerConfig from '../../page-configs/ui-elements/virtual-scroller/page-config'

const configComputed = computed(() => virtualScrollerConfig)
</script>
