<template>
  <div class="va-aspect-ratio">
    <div :style="stylesComputed" />
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useComponentPresetProp } from '../../composables'

export default defineComponent({
  name: 'VaAspectRatio',

  props: {
    ...useComponentPresetProp,
    ratio: { type: Number, validator: (v: number) => v > 0 },
    contentHeight: { type: Number, default: 1 },
    contentWidth: { type: Number, default: 1 },
  },

  setup (props) {
    const aspectRatio = computed(() => props.ratio || props.contentWidth / props.contentHeight)

    const stylesComputed = computed(() => ({ paddingBottom: `${1 / aspectRatio.value * 100}%` }))

    return { stylesComputed }
  },
})
</script>

<style lang="scss">
@import 'variables';

.va-aspect-ratio {
  position: var(--va-aspect-ratio-position);
  overflow: var(--va-aspect-ratio-overflow);
}
</style>
