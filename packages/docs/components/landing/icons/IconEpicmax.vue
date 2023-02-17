<template>
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.5 2.5H4.5L7.5 7L6.5 16H10L9 22L22.5 2.5Z"
      :stroke="colors.primary"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.9998 3.5L14 11"
      :stroke="colors.primary"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M11 7H14"
      :stroke="colors.primary"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.5 11H11.5H16"
      :stroke="colors.primary"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup>
import { computed } from 'vue'
import { useColors } from 'vuestic-ui/src/composables'

const { getColors } = useColors()
const colors = computed(getColors)
</script>
