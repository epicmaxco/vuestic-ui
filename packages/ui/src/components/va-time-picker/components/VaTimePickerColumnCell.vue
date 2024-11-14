<template>
  <div :style="styleComputed">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useColors, useCurrentElement, useElementHovered } from '../../../composables'
import { computed, ref } from 'vue'

defineOptions({
  name: 'VaTimePickerColumnCell',
})

const root = useCurrentElement()
const isHovered = useElementHovered(root)
const { getTextColor, getColor } = useColors()

const styleComputed = computed(() => isHovered.value
  ? ({
    color: getColor(getTextColor(getColor('background-secondary'))),
    background: getColor('background-secondary'),
  })
  : undefined)
</script>
