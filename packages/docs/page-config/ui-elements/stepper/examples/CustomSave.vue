<template>
  <VaStepper
    ref="actionStepper"
    v-model="currentStep"
    :steps="steps"
  >
    <template #step-content-0>
      <p>Validate on save</p>
      <VaInput
        v-model="model.a"
        label="A"
      />
    </template>
    <template #step-content-1>
      <p>Validate on save and disable navigation</p>
      <VaInput
        v-model="model.b"
        label="B"
        required-mark
      />
    </template>
    <template #step-content-2>
      <p>Validate instantly</p>
      <VaInput
        v-model="model.c"
        label="C"
        required-mark
      />
    </template>
  </VaStepper>
</template>

<script setup>
import { ref } from 'vue'
import { defineVaStepperSteps } from 'vuestic-ui'

const currentStep = ref(0)
const model = ref({ a: '', b: '', c: '', d: '' })

const steps = ref(defineVaStepperSteps([
  {
    label: 'One', beforeLeave: (fromStep, toStep) => {
      if (fromStep !== toStep) {
        alert('Thanks!')
      }
    }
  },
  {
    label: 'Two', beforeLeave: (step) => {
      step.hasError = model.value.b === ''
      return !step.hasError
    }
  },
  { label: 'Three' },
]))
</script>
