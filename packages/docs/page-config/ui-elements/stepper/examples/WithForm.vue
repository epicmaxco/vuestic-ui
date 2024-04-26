<template>
  <VaForm ref="stepperForm">
    <VaStepper
      ref="linearStepper"
      v-model="currentStep"
      :steps="steps"
      linear
    >
      <template #step-content-0>
        <VaForm ref="form0Ref" name="step0">
          <VaInput
            v-model="inputs.a"
            name="step1Input"
            label="A"
            :rules="[
              (v) => !!v || 'Required',
            ]"
            required-mark
          />
        </VaForm>
      </template>
      <template #step-content-1>
        <VaForm ref="form1Ref" name="step1">
          <VaInput
            v-model="inputs.b"
            name="step1Input"
            label="B"
            :rules="[
              asyncRequired,
            ]"
            required-mark
          />
        </VaForm>
      </template>
    </VaStepper>
  </VaForm>
</template>

<script setup>
import { ref } from 'vue';
import { useForm, defineVaStepperSteps } from 'vuestic-ui'

const currentStep = ref(0);
const inputs = ref({ a: '', b: '' })

const form0Ref = ref()
const form1Ref = ref()
const step0Form = useForm(form0Ref)
const step1Form = useForm(form1Ref)

const asyncRequired = (v) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(!!v || 'Required')
    }, 1000)
  })

const steps = ref(defineVaStepperSteps([
  {
    label: 'Simple form validation',
    beforeLeave: (step) => {
      step.hasError = !step0Form.validate()
    },
  },
  {
    label: 'Async form validation',
    beforeLeave: async (step) => {
      step.hasError = !(await step1Form.validateAsync())
    },
    isLoading: () => step1Form.isLoading.value,
  },
]))
</script>
