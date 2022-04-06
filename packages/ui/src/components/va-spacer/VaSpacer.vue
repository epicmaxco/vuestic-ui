<template>
  <div class="spacer" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VaSpacer',
})
</script>

<style lang="scss">
@import 'variables';

.spacer {
  flex-grow: var(--va-spacer-flex-grow);
}
</style>
