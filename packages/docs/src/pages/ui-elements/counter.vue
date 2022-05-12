<template>
  <docs-content :config="config" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DocsContent from '../../components/DocsContent.vue'
import config from '../../page-configs/ui-elements/counter/page-config'

export default defineComponent({
  name: 'DocsCounter',
  components: { DocsContent },
  setup: () => ({ config }),
})
</script>
