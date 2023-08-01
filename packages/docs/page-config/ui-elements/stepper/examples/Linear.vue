<template>
  <va-form ref="linearForm">
    <VaStepper v-model="step" :steps="steps" :form="linearForm">
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
import { required } from '../../../../../ui/src/utils/validators'

const step = ref()
const linearForm = ref()
const model = ref({ a: '', b: '', c: '' })

const steps = [
  { label: 'One' },
  { label: 'Two' },
  { label: 'Three' },
  { label: 'Four' },
  { label: 'Five' },
]
</script>
