<template>
  <va-stepper
    v-model="step"
    :steps="steps"
    color="danger"
    noControls
  >
    <template #divider>
      💸💸💸
    </template>

    <template
      v-for="step, i in steps"
      :key="step.label"
      #[`step-${i}`]="{ setStep, isActive }"
    >
      <span
        class="step"
        :class="{ 'step--active': isActive }"
        @click="setStep(i)"
      >
        {{ step.label }}
      </span>
    </template>

    <template #[`content-${0}`]>
      <ul>
        <li>Select a category</li>
        <li>Browse products</li>
        <li>Add to cart</li>
      </ul>
    </template>
    <template #[`content-${1}`]>
      <ul>
        <li>Fill out shipping information</li>
        <li>Choose payment method</li>
      </ul>
    </template>
    <template #[`content-${2}`]>
      <ul>
        <li>View order summary</li>
        <li>Edit shipping information</li>
      </ul>
    </template>
    <template #[`content-${3}`]>
      <ul>
        <li>Review order details</li>
        <li>Complete payment</li>
      </ul>
    </template>

    <template #controls="{ nextStep, prevStep, setStep }">
      <va-button @click="prevStep()">Previous</va-button>
      <va-button @click="nextStep()">Next</va-button>
      <va-button @click="setStep(steps.length - 1)">Go to last step</va-button>
    </template>
  </va-stepper>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const step = ref(0)

const steps = [
  { label: 'Choose your product', icon: 'store' },
  { label: 'Checkout', icon: 'local_shipping' },
  { label: 'Review order', icon: 'done_all' },
  { label: 'Confirm and pay', icon: 'payments' },
]
</script>

<style scoped>
.step {
  font-size: 1.5rem;
  color: blueviolet;
  cursor: pointer;
  padding: 1rem;
}

.step:hover {
  color: blue;
}

.step--active {
  color: red;
}
</style>
