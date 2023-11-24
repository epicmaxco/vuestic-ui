<template>
  <VaForm ref="stepForm">
    <VaStepper
      ref="linearStepper"
      v-model="currentStep"
      :steps="steps"
      linear
    >
      <template #step-content-0>
        <VaInput
          v-model="model.a"
          label="A"
          :rules="[
            (v) => !!v || 'Required',
          ]"
          required-mark
        />
      </template>
      <template #step-content-1>
        <VaInput
          v-model="model.b"
          label="B"
          :rules="[
            (v) => !!v || 'Required',
          ]"
          required-mark
        />
      </template>
      <template #step-content-2>
        <VaInput
          v-model="model.c"
          label="C"
        />
      </template>
      <template #step-content-3>
        <VaInput
          v-model="model.d"
          label="D"
          :rules="[
            (v) => !!v || 'Required',
          ]"
          required-mark
        />
      </template>
    </VaStepper>
  </VaForm>
</template>

<script setup>
import { ref } from 'vue';
import { useForm, defineVaStepperSteps } from 'vuestic-ui'

const currentStep = ref(0);
const model = ref({ a: '', b: '', c: '', d: '' })

const { validate } = useForm('stepForm')

const steps = ref(defineVaStepperSteps([
  {
    label: 'One',
    beforeLeave: (step) => {
      step.hasError = !validate()
    },
  },
  { label: 'Two', beforeLeave: (step) => { step.hasError = !validate() } },
  { label: 'Three', beforeLeave: (step) => { step.hasError = !validate() } },
  { label: 'Four', beforeLeave: (step) => { step.hasError = !validate() } },
]))
</script>
