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
      <VaStepper v-model="step" :steps="steps" navigationDisabled>
        <template
          v-for="(step, i) in steps"
          :key="step.label"
          #[`step-content-${i}`]
        >
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

    <VbCard title="Step validation">
      Highlight step is has error
      <VaStepper ref="actionStepper" v-model="actionStep" :steps="stepsWithNextAction">
        <template #step-content-0>
          <va-input v-model="model.a" label="A">
          </va-input>
        </template>
        <template #step-content-1>
          <va-input v-model="model.b" label="B"></va-input>
          <p>Navigation is enabled, because it is not a linear stepper</p>
          <p>Validated after moved to another pages</p>
        </template>
        <template #step-content-2>
          <va-input v-model="model.c" label="C"></va-input>
          <p>Navigation is disabled, because beforeLeave explicitly returned false</p>
        </template>
        <template #step-content-3>
          <va-input v-model="model.d" label="D"></va-input>
          <p>Validates on rendering</p>
        </template>
      </VaStepper>
    </VbCard>

    <VbCard title="Step validation (with linear stepper)">
      Highlight step is has error. User is not able to navigate if current step has error. User is not able over jump step if previous step has error or wasn't completed.
      <VaStepper ref="linearStepper" v-model="linearStep" :steps="linearSteps" linear>
        <template #step-content-0>
          <va-input v-model="model.a" label="A"></va-input>
        </template>
        <template #step-content-1>
          <va-input v-model="model.b" label="B"></va-input>
          <p>Navigation is disabled if input is empty</p>
        </template>
        <template #step-content-2>
          <va-input v-model="model.c" label="C"></va-input>
        </template>
        <template #step-content-3>
          <va-input v-model="model.d" label="D"></va-input>
        </template>
      </VaStepper>
    </VbCard>

    <VbCard title="All steps completed with a finish step">
      <VaStepper v-model="cStep" :steps="completedSteps" showFinishStep :finishStep="finishStep">
        <template v-for="(cStep, i) in completedSteps" :key="cStep.label" #[`step-content-${i}`]>
          This is step {{ cStep.label }}.
        </template>
        <template #[`step-content-${completedSteps.length}`]>
          This is finish content.
        </template>
      </VaStepper>
    </VbCard>

    <VbCard title="All steps completed with a finish step(with disabled navigation on finish)">
      <VaStepper v-model="cStep" :steps="completedSteps" :showFinishStep="true" :finishStep="finishStep"
        disableNavigationOnFinish>
        <template v-for="(cStep, i) in completedSteps" :key="cStep.label" #[`step-content-${i}`]>
          This is step {{ cStep.label }}.
        </template>
        <template #[`step-content-${completedSteps.length}`]>
          This is finish content.
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
const model = ref({ a: '', b: '', c: '', d: '' })
const retryCount = ref(0)
const linearStepper = ref()
const actionStepper = ref()
const cStep = ref(2)

const steps = [
  { label: 'One' },
  { label: 'Two' },
  { label: 'Three' },
  { label: 'Four' },
  { label: 'Five' },
]

const linearSteps = ref<Step[]>([
  {
    label: 'One',
    beforeLeave: (step) => {
      if (step.completed) { return }

      retryCount.value++

      if (retryCount.value < 3) {
        alert('Try again. You need to click next ' + (3 - retryCount.value) + ' more times')
        return false
      }

      retryCount.value = 0
      return true
    },
  },
  // VaForm can be used here: step.hasError = !form.validate()
  { label: 'Two', beforeLeave: (step) => { step.hasError = model.value.b === '' } },
  { label: 'Three', disabled: true },
  { label: 'Four' },
])

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

const stepsWithNextAction = ref<Step[]>([
  { label: 'One' },
  { label: 'Two', beforeLeave: (step) => { step.hasError = true } },
  { label: 'Three', beforeLeave: (step) => model.value.c !== '' },
  { label: 'Four', hasError: (step) => model.value.d === '' },
])

const completedSteps = ref<Step[]>([
  { label: 'One', completed: true },
  { label: 'Two', completed: true },
  { label: 'Three', completed: true },
])

const finishStep = ref<Step>({
  label: 'Finish',
  icon: 'check',
})

</script>
