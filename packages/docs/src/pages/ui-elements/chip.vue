<template>
  <docs-content :config="chipConfig" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import DocsContent from '../../components/DocsContent.vue'
import chipConfig from '../../page-configs/ui-elements/chip/page-config'

export default defineComponent({
  name: 'DocsChip',
  components: { DocsContent },
  setup: () => ({ chipConfig }),
})
</script>
