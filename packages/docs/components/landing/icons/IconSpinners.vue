<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="24"
    fill="none"
    viewBox="0 0 25 24"
  ><path
    :stroke="colors.primary"
    d="M4.5 16.13A9 9 0 0 1 17.48 4.5M7.5 19.48A9 9 0 0 0 20.3 7.5"
  /><path
    :stroke="colors.primary"
    d="M4.5 16.13A9 9 0 0 1 17.48 4.5M7.5 19.48A9 9 0 0 0 20.3 7.5"
  /><circle
    :stroke="colors.primary"
    cx="5.5"
    cy="18"
    r="2"
  /><circle
    :stroke="colors.primary"
    cx="19.5"
    cy="6"
    r="2"
  /><circle
    :stroke="colors.primary"
    cx="12.5"
    cy="12"
    r="4"
  /></svg>
</template>

<script setup>
import { computed } from 'vue'
import { useColors } from 'vuestic-ui/src/composables'

const { getColors } = useColors()
const colors = computed(getColors)
</script>
