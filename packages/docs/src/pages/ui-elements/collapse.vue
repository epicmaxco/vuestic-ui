<template>
  <docs-content :config="collapseConfig" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import DocsContent from '../../components/DocsContent.vue'
import collapseConfig from '../../page-configs/ui-elements/collapse/page-config'

export default defineComponent({
  name: 'DocsChip',
  components: { DocsContent },
  setup: () => ({ collapseConfig }),
})
</script>
