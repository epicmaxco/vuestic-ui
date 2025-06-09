import { StoryFn } from '@storybook/vue3'
import MultiStepForm from './MultiStepForm.vue'

export default {
  title: 'Vueform Integration/MultiStepForm',
}


export const Default: StoryFn = () => ({
  components: {
    MultiStepForm
  },
  template: `
    <MultiStepForm/>
  `,
})
