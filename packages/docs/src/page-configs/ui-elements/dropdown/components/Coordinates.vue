<template>
  <svg class="placement-coordinates" xmlns="http://www.w3.org/2000/svg" width="104" height="104" fill="none">
    <g>
      <path
        :style="computedStyle.y"
        d="M50.5 102a1.5 1.5 0 0 0 3 0h-3ZM53.06.94a1.5 1.5 0 0 0-2.12 0l-9.55 9.55a1.5 1.5 0 1 0 2.12 2.12L52 4.12l8.49 8.49a1.5 1.5 0 1 0 2.12-2.12L53.06.94ZM53.5 102V2h-3v100h3Z"
      />
      <path
        :style="computedStyle.x"
        d="M2 50.5a1.5 1.5 0 0 0 0 3v-3Zm101.06 2.56a1.5 1.5 0 0 0 0-2.12l-9.55-9.55a1.5 1.5 0 1 0-2.12 2.12L99.88 52l-8.49 8.49a1.5 1.5 0 1 0 2.12 2.12l9.55-9.55ZM2 53.5h100v-3H2v3Z"
      />
    </g>
  </svg>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  placement: {
    type: String,
    default: 'top',
  },
})

const main = computed(() => ['top', 'bottom', 'auto'].some((p) => props.placement.includes(p)) ? 'y' : 'x')
const cross = computed(() => main.value === 'y' ? 'x' : 'y')
const mainReversed = computed(() => ['bottom', 'left', 'auto'].some((p) => props.placement.includes(p)))
const crossReversed = computed(() => cross.value === 'y')

const computedStyle = computed(() => {
  return {
    [main.value]: { fill: 'var(--va-primary)', transform: mainReversed.value ? 'scale(-1) translate(-100%, -100%)' : '' },
    [cross.value]: { fill: 'var(--va-secondary)', opacity: 0.3, transform: crossReversed.value ? 'scale(-1) translate(-100%, -100%)' : '' },
  }
})
</script>

<style lang="scss" scoped>
.placement-coordinates {
  border: 1px solid var(--va-divider);
  padding: 4px;
}
</style>
