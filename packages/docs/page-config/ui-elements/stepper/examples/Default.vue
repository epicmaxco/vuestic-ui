<template>
  <VaStepper
    v-model="step"
    :steps="steps"
  >
    <template #step-content-0>
      <ul>
        <li>Select a category</li>
        <li>Browse products</li>
        <li>Add to cart</li>
      </ul>
    </template>
    <template #step-content-1>
      <ul>
        <li>Fill out shipping information</li>
        <li>Choose payment method</li>
      </ul>
    </template>
    <template #step-content-2>
      <ul>
        <li>View order summary</li>
        <li>Edit shipping information</li>
      </ul>
    </template>
    <template #step-content-3>
      <ul>
        <li>Review order details</li>
        <li>Complete payment</li>
      </ul>
    </template>
  </VaStepper>
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
