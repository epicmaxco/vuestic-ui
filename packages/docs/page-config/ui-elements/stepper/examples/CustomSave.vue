<template>
  <h1>{{ saveResult }}</h1>
  <br />
  <va-stepper v-model="step" :steps="steps">
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
  </va-stepper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Step } from 'vuestic-ui/src/components/va-stepper/types';

const step = ref(0);
const saveResult = ref();

const steps = [
  { label: 'Choose your product', save: () => { saveResult.value = 'Product saved!'; } },
  { label: 'Checkout', save: () => { saveResult.value = 'Checkout saved!'; } },
  { label: 'Review order' },
  { label: 'Confirm and pay', save: () => { saveResult.value = 'Payment confirmed!'; } },
] as Step[]
</script>
