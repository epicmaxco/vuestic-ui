<template>
  <button
    class="va-rating__number-item"
    tabindex="-1"
    aria-hidden="true"
    :style="{
      background: backgroundComputed,
      color: textColorComputed,
      ...variablesComputed,
    }"
  >
    {{ itemNumber }}
  </button>
</template>

<script lang="ts" setup>
import { useSizeProps } from '../../../composables'
import { useVaRatingColorsProps, useVaRatingColors } from '../hooks/useVaRatingColors'
import { useComponentVariables } from '../../../composables/useComponentVariables'

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

const variables = ['size', 'fontSize', 'borderRadius', 'fontWeight', 'margin'] as const

const variablesComputed = useComponentVariables(variables, props)
</script>
<style lang="scss">
@import "../../../styles/resources";

.va-rating__number-item {
  @include normalize-button();

  margin: var(--va-rating-number-item-margin-current);
  font-weight: var(--va-rating-number-item-font-weight-current);

  @include flex-center();

  cursor: pointer;

  --font-size: max(var(--va-rating-number-item-font-size-current), calc(var(--va-rating-number-item-size-current) * 0.8));

  width: var(--va-rating-number-item-size-current);
  height: var(--va-rating-number-item-size-current);
  font-size: var(--font-size);
  border-radius: var(--va-rating-number-item-border-radius-current, calc(var(--font-size) * 0.125));
}
</style>
