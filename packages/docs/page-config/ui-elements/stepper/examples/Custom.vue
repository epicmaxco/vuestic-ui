<template>
  <va-stepper
    v-model="step"
    :steps="steps"
    color="danger"
    controlsHidden
  >
    <template #divider>
      <div class="divider gradient" />
    </template>

    <template
      v-for="step, i in steps"
      :key="step.label"
      #[`step-button-${i}`]="{ setStep, isActive, isCompleted }"
    >
      <div
        class="step-button"
        :class="{
          'step-button--active': isActive,
          'step-button--completed': isCompleted,
        }"
        @click="setStep(i)"
      >
        <va-icon :name="step.icon" />
        {{ step.label }}
      </div>
    </template>

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

    <template #controls="{ nextStep, prevStep, setStep }">
      <va-button @click="prevStep()">Previous</va-button>
      <va-button @click="nextStep()">Next</va-button>
      <va-button @click="setStep(steps.length - 1)">Go to last step</va-button>
    </template>
  </va-stepper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VaIcon } from 'vuestic-ui'

const step = ref(0)

const steps = [
  { label: 'Choose your product', icon: 'store' },
  { label: 'Checkout', icon: 'local_shipping' },
  { label: 'Review order', icon: 'done_all' },
  { label: 'Confirm and pay', icon: 'payments' },
]
</script>

<style scoped>

.gradient {
  background:
    linear-gradient(
      90deg,
      rgb(131, 58, 180) 0%,
      rgb(253, 29, 29) 50%,
      rgb(241, 170, 48) 100%
    );
}

.divider {
  flex-grow: 1;
  margin: 0 1rem;
  height: 2px;
  width: 2rem;
  border-radius: 1rem;
}

.step-button {
  display: flex;
  gap: 1rem;
  color: rgb(241, 170, 48);
  cursor: pointer;
  padding: 1rem;
  transition: all 0.2s;
}

.step-button:hover {
  color: rgb(253, 29, 29);
}

.step-button--active {
  color: rgba(253, 29, 29);
}

.step-button--completed {
  color: rgb(131, 58, 180);
}
</style>
