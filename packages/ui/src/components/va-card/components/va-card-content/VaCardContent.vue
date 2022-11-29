<template>
  <div class="va-card__content">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VaCardContent',
})
</script>

<style lang="scss">
.va-card__content {
  .va-card-block {
    flex: 1;
  }
}
</style>
