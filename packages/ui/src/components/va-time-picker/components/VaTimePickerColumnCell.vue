<template>
  <div @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" :style="styleComputed">
    <slot />
  </div>
</template>

<script lang="ts">
import { useHover, useColors } from '../../../composables'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'VaTimePickerColumnCell',

  setup () {
    const { isHovered, onMouseEnter, onMouseLeave } = useHover()
    const { getTextColor, getColor } = useColors()

    const styleComputed = computed(() => isHovered.value
      ? ({
        color: getColor(getTextColor(getColor('background-secondary'))),
        background: getColor('background-secondary'),
      })
      : undefined)

    return {
      onMouseEnter, onMouseLeave, styleComputed,
    }
  },
})
</script>
