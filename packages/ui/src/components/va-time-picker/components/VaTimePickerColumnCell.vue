<template>
  <div @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" :style="styleComputed">
    <slot />
  </div>
</template>

<script lang="ts">
import { useHover } from '../../../composables/useHover'
import { computed, defineComponent } from 'vue'
import { useColors } from '../../../services/color-config/color-config'

export default defineComponent({
  name: 'VaTimePickerColumnCell',

  setup () {
    const { isHovered, onMouseEnter, onMouseLeave } = useHover()
    const { getTextColor, getColor } = useColors()

    const styleComputed = computed(() => isHovered.value
      ? ({
        color: getColor(getTextColor(getColor('background-soft'))),
        background: getColor('background-soft'),
      })
      : undefined)

    return {
      onMouseEnter, onMouseLeave, styleComputed,
    }
  },
})
</script>
