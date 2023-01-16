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
.va-card {
  &__title,
  &__content,
  &__actions,
  &__actions--vertical {
    padding: var(--va-card-padding);

    + .va-card__title,
    + .va-card__content,
    + .va-card__actions,
    + .va-card_actions__vertical {
      padding-top: 0;
    }
  }
}

.va-card__content {
  .va-card-block {
    flex: 1;
  }
}
</style>
