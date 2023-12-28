<template>
  <div
    class="va-card-title va-card__title"
    :style="titleStyles"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { useComponentPresetProp, useColors } from '../../../../composables'

defineOptions({
  name: 'VaCardTitle',
})

const props = defineProps({
  ...useComponentPresetProp,
  textColor: { type: String },
})

const { getColor } = useColors()

const titleStyles = computed(() => ({
  color: props.textColor ? getColor(props.textColor) : '',
}))
</script>

<style lang="scss" scoped>
@import "../../../../styles/resources";

.va-card {
  &__title {
    display: flex;
    align-items: center;

    @include va-title();
  }

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
</style>
