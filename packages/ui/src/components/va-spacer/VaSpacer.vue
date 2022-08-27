<template>
  <div class="va-spacer" aria-hidden="true" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VaSpacer',
})
</script>

<style lang="scss">
  @import 'variables';

  .va-spacer {
    flex-grow: var(--va-spacer-flex-grow);
  }
</style>
