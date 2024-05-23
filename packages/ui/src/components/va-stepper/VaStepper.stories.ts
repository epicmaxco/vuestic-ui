import { defineComponent, ref } from 'vue'
import VaStepperDemo from './VaStepper.demo.vue'
import VaStepper from './VaStepper.vue'
import { StoryFn } from '@storybook/vue3'

export default {
  title: 'VaStepper',
  component: VaStepper,
}

export const Default: StoryFn = () => ({
  components: { VaStepperDemo },
  template: '<VaStepperDemo/>',
})

export const NextDisabled: StoryFn = () => ({
  components: { VaStepper },

  setup () {
    return {
      steps: [
        { label: 'Step 1' },
        { label: 'Step 2' },
        { label: 'Step 3' },
      ],
      currentStep: ref(0),
    }
  },

  template: `
    [current]: {{ currentStep }}
    <VaStepper :steps="steps" v-model="currentStep" next-disabled>
      <template #step-content-0>
        Step 1
      </template>
      <template #step-content-1>
        Step 2
      </template>
      <template #step-content-2>
        Step 3
      </template>
    </VaStepper>
  `,
})

export const NextDisabledWhenHasError: StoryFn = () => ({
  components: { VaStepper },

  setup () {
    const testInputText = ref('')

    return {
      steps: [
        { label: 'Step 1' },
        { label: 'Step 2', hasError: () => testInputText.value.length === 0 },
        { label: 'Step 3' },
      ],
      currentStep: ref(0),
      testInputText,
    }
  },

  template: `
    [current]: {{ currentStep }}
    <VaStepper :steps="steps" v-model="currentStep" nextDisabledOnError>
      <template
        v-for="(step, i) in steps"
        :key="step.label"
        #[\`step-content-\${i}\`]
      >
        <input v-model="testInputText" />
      </template>
    </VaStepper>
  `,
})

export const FinishStep: StoryFn = () => ({
  components: { VaStepper },

  setup () {
    const testInputText = ref('')

    return {
      steps: [
        { label: 'Step 1' },
        { label: 'Step 2' },
        { label: 'Step 3' },
      ],
      finishStep: {
        label: 'Finish',
      },
      currentStep: ref(0),
      testInputText,
    }
  },

  template: `
    [current]: {{ currentStep }}
    <VaStepper :steps="steps" v-model="currentStep" :finish-step="finishStep">

    <template
      v-for="(step, i) in steps"
      :key="step.label"
      #[\`step-content-\${i}\`]
    >
      Step content {{ step.label }} - {{ i }}
    </template>

    <template #step-content-finish>
      The End!
    </template>
  </VaStepper>
  `,
})
