<template>
  <div style="color: var(--va-primary);">
    v{{ version }}
  </div>
</template>

<script lang="ts">
import { version } from 'vuestic-ui/package.json'

export default defineComponent({
  setup() {
    return { version }
  }
})
</script>
