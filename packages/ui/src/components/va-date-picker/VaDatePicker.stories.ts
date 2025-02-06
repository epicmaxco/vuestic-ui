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

export const Range = () => ({
  components: { VaDatePicker },

  data () {
    return {
      value: { start: new Date('2020-01-01T00:00:00.000Z'), end: new Date('2020-01-02T00:00:00.000Z') },
    }
  },

  template: `
  {{ value }}
  <VaDatePicker v-model="value" />
  `,
})
