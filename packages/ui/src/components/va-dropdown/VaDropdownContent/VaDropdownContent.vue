<template>
  <div class="va-dropdown__content" :style="noPadding && { padding: 0 }">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    noPadding: { type: Boolean, default: false },
  },
})
</script>

<style lang="scss">
  @import "variables";

  .va-dropdown {
    &__content {
      background: var(--va-dropdown-content-background);
      padding: var(--va-dropdown-content-padding);
      box-shadow: var(--va-dropdown-content-box-shadow);
      border-radius: var(--va-dropdown-content-border-radius);
    }
  }
</style>
