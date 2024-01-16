<template>
  <button
    class="va-rating__number-item"
    tabindex="-1"
    aria-hidden="true"
    :style="{
      background: backgroundComputed,
      color: textColorComputed,
      width: sizeComputed,
      height: sizeComputed,
      fontSize: fontSizeComputed,
      borderRadius: `${parseInt(fontSizeComputed) * 0.125}rem`,
    }"
  >
    {{ itemNumber }}
  </button>
</template>

<script lang="ts" setup>
import { useSize, useSizeProps } from '../../../composables'
import { useVaRatingColorsProps, useVaRatingColors } from '../hooks/useVaRatingColors'

defineOptions({
  name: 'VaRatingItemNumberButton',
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

const {
  sizeComputed,
  fontSizeComputed,
  fontSizeInRem,
} = useSize(props, 'VaRating')
</script>
