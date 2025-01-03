import { StoryFn } from '@storybook/vue3'
import { ref } from 'vue'

export default {
  title: 'Formkit Integration/Timepicker',
}

export const Default: StoryFn = () => ({
  setup() {
    const date = ref(new Date('2010-01-01'))
    return {
      date
    }
  },
  template: `
    <FormKit
      type="timepicker"
      v-model="date"
      label="Birthday"
      help="Enter your birth day"
      validation="required|date_before:2010-01-01"
      validation-visibility="live"
    />
  `,
})
