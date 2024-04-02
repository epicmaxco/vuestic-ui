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
    <VaStepper :steps="steps" v-model="currentStep">

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
