<template>
  <div
    class="va-card__title"
    :style="titleStyles"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useComponentPresetProp, useColors } from '../../composables'

export default defineComponent({
  name: 'VaCardTitle',
  props: {
    ...useComponentPresetProp,
    textColor: { type: String },
  },
  setup (props) {
    const { getColor } = useColors()

    return {
      titleStyles: computed(() => ({
        color: props.textColor ? getColor(props.textColor) : '',
      })),
    }
  },
})
</script>
