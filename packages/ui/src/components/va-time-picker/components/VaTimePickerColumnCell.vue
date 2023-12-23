<template>
  <div @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" :style="styleComputed">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useHover, useColors } from '../../../composables'
import { computed } from 'vue'

defineOptions({
  name: 'VaTimePickerColumnCell',
})

const { isHovered, onMouseEnter, onMouseLeave } = useHover()
const { getTextColor, getColor } = useColors()

const styleComputed = computed(() => isHovered.value
  ? ({
    color: getColor(getTextColor(getColor('background-secondary'))),
    background: getColor('background-secondary'),
  })
  : undefined)
</script>
