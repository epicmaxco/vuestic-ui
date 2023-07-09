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
  </VbDemo>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { VaStepper } from './index'

const step = ref(2)

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
</script>
