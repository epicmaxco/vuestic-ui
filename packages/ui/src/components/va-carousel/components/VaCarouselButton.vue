<template>
  <va-hover #default="{ hover }" stateful>
    <va-button
      :aria-label="ariaLabel"
      :color="active ? computedActiveColor : (hover ? computedHoverColor : computedColor)"
      :icon="icon"
      :round="round"
    >
      <slot />
    </va-button>
  </va-hover>
</template>

<script setup lang="ts">
import { VaHover, VaButton } from '../..'
import { computed } from 'vue'
import { useColors } from '../../../composables'

const props = defineProps({
  ariaLabel: {
    type: String,
  },
  color: {
    type: String,
    default: 'primary',
  },
  active: {
    type: Boolean,
    default: false,
  },
  round: {
    type: Boolean,
    default: true,
  },
  icon: {
    type: String,
    default: '',
  },
})

const { setHSLAColor, getColor } = useColors()

const computedColor = computed(() => setHSLAColor(getColor('background-element'), { a: 0.7 }))
const computedHoverColor = computed(() => setHSLAColor(getColor('primary'), { a: 0.7 }))
const computedActiveColor = computed(() => getColor('primary'))
</script>
