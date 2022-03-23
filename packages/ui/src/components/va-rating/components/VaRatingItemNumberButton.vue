<template>
  <button
    class="va-rating__number-item"
    tabindex="-1"
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

<script lang="ts">
import { defineComponent } from 'vue'
import { useVaRatingColorsProps, useVaRatingColors } from '../hooks/useVaRatingColors'
import { useSize, useSizeProps } from '../../../composables/useSize'

export default defineComponent({
  name: 'VaRatingItemNumberButton',

  props: {
    ...useVaRatingColorsProps,
    ...useSizeProps,
    itemNumber: { type: Number, required: true },
    modelValue: { type: Number, required: true },
  },

  setup (props) {
    return {
      ...useVaRatingColors(props),
      ...useSize(props, 'VaRating'),
    }
  },
})
</script>
