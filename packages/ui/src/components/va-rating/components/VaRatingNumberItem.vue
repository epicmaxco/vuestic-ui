<template>
  <button
    class="va-rating__number-item"
    tabindex="-1"
    aria-hidden="true"
    :style="{
      background: backgroundComputed,
      color: textColorComputed,
    }"
  >
    {{ itemNumber }}
  </button>
</template>

<script lang="ts" setup>
import { useSizeProps } from '../../../composables'
import { useVaRatingColorsProps, useVaRatingColors } from '../hooks/useVaRatingColors'

defineOptions({
  name: 'VaRatingNumberItem',
})

const props = defineProps({
  ...useVaRatingColorsProps,
  ...useSizeProps,
  itemNumber: { type: Number, required: true },
  modelValue: { type: Number, required: true },
})

const {
  textColorComputed,
  backgroundComputed,
} = useVaRatingColors(props)
</script>
<style lang="scss">
@import "../../../styles/resources";

.va-rating__number-item {
  @include normalize-button();

  margin: var(--va-rating-number-item-margin);
  font-weight: var(--va-rating-number-item-font-weight);

  @include flex-center();

  cursor: pointer;

  --size: var(--va-rating-size, var(--va-rating-number-item-size));
  --font-size: max(var(--va-rating-number-item-font-size), calc(var(--size) * 0.8));

  width: var(--size);
  height: var(--size);
  font-size: var(--font-size);
  border-radius: var(--va-rating-number-item-border-radius, calc(var(--font-size) * 0.125));
}
</style>
