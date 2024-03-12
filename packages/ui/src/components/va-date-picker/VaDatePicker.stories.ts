import VaDatePickerDemo from './VaDatePicker.demo.vue'
import VaDatePicker from './VaDatePicker.vue'
import { StoryFn } from '@storybook/vue3'

export default {
  title: 'VaDatePicker',
  component: VaDatePicker,
}

export const Default: StoryFn = () => ({
  components: { VaDatePickerDemo },
  template: '<VaDatePickerDemo />',
})

export const firstWeekDay: StoryFn = () => ({
  components: { VaDatePicker },
  template: `
  <VaDatePicker firstWeekday="sunday"/>
  <VaDatePicker firstWeekday="monday"/>
  `,
})
