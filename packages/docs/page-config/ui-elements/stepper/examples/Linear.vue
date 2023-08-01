<template>
  <va-form ref="linearForm">
    <VaStepper ref="stepper" v-model="step" :steps="steps" linear>
      <template #step-content-0>
        <va-input v-model="model.a" :rules="[required(model.a)]" label="A">
        </va-input>
      </template>
      <template #step-content-1>
        <va-input v-model="model.b" label="B"></va-input>
      </template>
      <template #step-content-2>
        <va-input v-model="model.c" label="C"></va-input>
      </template>
    </VaStepper>
  </va-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Step } from 'vuestic-ui/src/components/va-stepper/types';
import { useForm } from 'vuestic-ui/web-components';
import { required } from '../../../../../ui/src/utils/validators'

const step = ref()
const linearForm = ref()
const { validate } = useForm(linearForm)
const model = ref({ a: '', b: '', c: '' })
const stepper = ref()

const steps = ref([
  { label: 'One', save: () => {
    if(validate())
      (stepper as any).value.completeStep()
    else
      (stepper as any).value.setError()
  } },
  { label: 'Two' },
  { label: 'Three' },
  { label: 'Four' },
  { label: 'Five' },
] as Step[])
</script>
