<template>
  <VbDemo>
    <VbCard title="Default">
      <VaStepper v-model="step" :steps="steps">
        <template v-for="(step, i) in steps" :key="step.label" #[`step-content-${i}`]>
          This is {{ step.label }} content.
        </template>
      </VaStepper>
    </VbCard>
    <VbCard title="With disabled steps">
      <VaStepper v-model="step" :steps="stepsWithDisabled">
        <template v-for="(step, i) in stepsWithDisabled" :key="step.label" #[`step-content-${i}`]>
          This is {{ step.label }} content.
        </template>
      </VaStepper>
    </VbCard>
    <VbCard title="Custom icons and no controls">
      <VaStepper v-model="step" :steps="stepsWithCustomIcons" controlsHidden />
    </VbCard>
    <VbCard title="Navigation disabled">
      <VaStepper v-model="step" :steps="steps" navigationDisabled>
        <template v-for="(step, i) in steps" :key="step.label" #[`step-content-${i}`]>
          This is {{ step.label }} content.
        </template>
      </VaStepper>
    </VbCard>
    <VbCard title="Next disabled">
      <VaStepper v-model="step" :steps="steps" nextDisabled>
        <template v-for="(step, i) in steps" :key="step.label" #[`step-content-${i}`]>
          This is {{ step.label }} content.
        </template>
      </VaStepper>
    </VbCard>
    <VbCard title="Vertical">
      <VaStepper v-model="step" :steps="steps" vertical>
        <template v-for="(step, i) in steps" :key="step.label" #[`step-content-${i}`]>
          This is {{ step.label }} content.
        </template>
      </VaStepper>
    </VbCard>

    <VbCard title="Finish button hidden">
      <VaStepper v-model="step" :steps="steps" finishButtonHidden> </VaStepper>
    </VbCard>

    <VbCard title="Linear">
      <va-form ref="linearForm">
        <VaStepper v-model="linearStep" :steps="steps" :form="linearForm">
          <template #step-content-0>
              <va-input v-model="model.a" :rules="[required(model.a)]" label="A"></va-input>
              <br />
              <va-input v-model="model.b2" :rules="[(v) => v.length > 0 && v == '13' || 'Must be 13']" label="B2"></va-input>
            </template>
            <template #step-content-1>
              <va-input v-model="model.b" :rules="[(v) => v.length > 0 && v == 'test' || 'Must be test']" label="B"></va-input>
          </template>
        <template #step-content-2>
          <va-input v-model="model.c" label="C"></va-input>
        </template>
      </VaStepper>
    </va-form>
    </VbCard>

    <VbCard title="Default with unique next commands">
      <VaStepper v-model="actionStep" :steps="stepsWithNextAction">
        <template #step-content-0>
          <va-input v-model="model.a" label="A">
          </va-input>
        </template>
        <template #step-content-1>
          <va-input v-model="model.b" :rules="[(v) => v.length > 0 || 'Required']" label="B"></va-input>
        </template>
        <template #step-content-2>
          <va-input v-model="model.c" label="C"></va-input>
        </template>
      </VaStepper>
    </VbCard>
  </VbDemo>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { VaStepper } from './index'
import { VaInput } from '../va-input'
import { required } from '../../utils/validators'
import { VaForm } from '../va-form'

const step = ref(2)
const linearStep = ref()
const actionStep = ref()
const model = ref({ a: '', b: '', b2: '', c: '' })
const linearForm = ref()

const steps = [
  { label: 'One' },
  { label: 'Two' },
  { label: 'Three' },
  { label: 'Four' },
  { label: 'Five' },
]

const stepsWithDisabled = [
  { label: 'One' },
  { label: 'Two', disabled: true },
  { label: 'Three' },
  { label: 'Four', disabled: true },
  { label: 'Five' },
]

const stepsWithCustomIcons = [
  { label: 'One', icon: 'search' },
  { label: 'Two', icon: 'home' },
  { label: 'Three', icon: 'delete' },
  { label: 'Four', icon: 'grade' },
  { label: 'Five', icon: 'list' },
]

const stepsWithNextAction = [
  { label: 'One' },
  { label: 'Two', save: () => { step2Next() } },
  { label: 'Three', save: () => { alert('Step 3 Action') } },
]

const step2Next = () => {
  fetch('').then()
}

</script>
