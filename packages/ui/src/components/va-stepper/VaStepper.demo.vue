<template>
  <VbDemo>
    <VbCard title="Default">
      <VaStepper v-model="step" :steps="steps">
        <template
          v-for="(step, i) in steps"
          :key="step.label"
          #[`step-content-${i}`]
        >
          This is {{ step.label }} content.
        </template>
      </VaStepper>
    </VbCard>
    <VbCard title="With disabled steps">
      <VaStepper v-model="step" :steps="stepsWithDisabled">
        <template
          v-for="(step, i) in stepsWithDisabled"
          :key="step.label"
          #[`step-content-${i}`]
        >
          This is {{ step.label }} content.
        </template>
      </VaStepper>
    </VbCard>
    <VbCard title="Custom icons and no controls">
      <VaStepper v-model="step" :steps="stepsWithCustomIcons" controlsHidden />
    </VbCard>
    <VbCard title="Navigation disabled">
      <VaStepper
        v-model="step"
        :steps="steps"
        navigationDisabled
      >
        <template v-for="(step, i) in steps" :key="step.label" #[`step-content-${i}`]>
          This is {{ step.label }} content.
        </template>
      </VaStepper>
    </VbCard>
    <VbCard title="Next disabled">
      <VaStepper v-model="step" :steps="steps" nextDisabled>
        <template
          v-for="(step, i) in steps"
          :key="step.label"
          #[`step-content-${i}`]
        >
          This is {{ step.label }} content.
        </template>
      </VaStepper>
    </VbCard>
    <VbCard title="Vertical">
      <VaStepper v-model="step" :steps="steps" vertical>
        <template
          v-for="(step, i) in steps"
          :key="step.label"
          #[`step-content-${i}`]
        >
          This is {{ step.label }} content.
        </template>
      </VaStepper>
    </VbCard>

    <VbCard title="Finish button hidden">
      <VaStepper v-model="step" :steps="steps" finishButtonHidden> </VaStepper>
    </VbCard>

    <VbCard title="Linear">
        <VaStepper ref="linearStepper" v-model="linearStep" :steps="linearSteps" linear>
          <template #step-content-0>
              <va-input v-model="model.a" label="A"></va-input>
              <br />
              <va-input v-model="model.b2" label="B2"></va-input>
            </template>
            <template #step-content-1>
              <va-input v-model="model.b" label="B"></va-input>
          </template>
        <template #step-content-2>
          <va-input v-model="model.c" label="C"></va-input>
        </template>
      </VaStepper>
    </VbCard>

    <VbCard title="Default with unique next commands">
      <VaStepper ref="actionStepper" v-model="actionStep" :steps="stepsWithNextAction">
        <template #step-content-0>
          <va-input v-model="model.a" label="A">
          </va-input>
        </template>
        <template #step-content-1>
          <va-input v-model="model.b" label="B"></va-input>
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
import { Step } from './types'

const step = ref(2)
const linearStep = ref()
const actionStep = ref()
const model = ref({ a: '', b: '', b2: '', c: '' })
const retryCount = ref(0)
const linearStepper = ref()
const actionStepper = ref()

const steps = [
  { label: 'One' },
  { label: 'Two' },
  { label: 'Three' },
  { label: 'Four' },
  { label: 'Five' },
]

const linearSteps = ref([
  { label: 'One', save: () => { completeLinearStep() } },
  { label: 'Two', save: () => { completeLinearStep() } },
  { label: 'Three' },
  { label: 'Four' },
  { label: 'Five' },
] as Step[])

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

const stepsWithNextAction = ref([
  { label: 'One' },
  { label: 'Two', save: () => { setError() } },
  { label: 'Three', save: () => { alert('Step 3 Action') } },
] as Step[])

const completeLinearStep = () => {
  (linearStepper as any).value.completeStep()
}

const setError = () => {
  if (retryCount.value !== 0) {
    (actionStepper as any).value.setError(false)
  } else {
    (actionStepper as any).value.setError()
    retryCount.value++
  }
}

</script>
