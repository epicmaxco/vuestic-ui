import { StoryFn } from '@storybook/vue3'
import BasicForm from './BasicForm.vue'
import MultiStepForm from './MultiStepForm.vue'

export default {
  title: 'Formkit Integration/Form',
}

export const Basic: StoryFn = () => ({
  components: {
    BasicForm
  },
  template: `<BasicForm />`,
})

export const MultiStep: StoryFn = () => ({
  components: {
    MultiStepForm
  },
  template: `<MultiStepForm />`,
})
