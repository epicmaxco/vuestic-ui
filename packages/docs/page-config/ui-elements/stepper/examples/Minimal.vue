<template>
  <VaStepper
    v-model="step"
    :steps="steps"
    controls-hidden
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const step = ref(0)

const steps = [
  { label: 'Choose your product' },
  { label: 'Checkout' },
  { label: 'Review order' },
  { label: 'Confirm and pay' },
]
</script>
