import { StoryFn } from '@storybook/vue3'
import * as types from '@vuestic/formkit'

export default {
  title: 'Formkit Integration/Date',
}

export const Default: StoryFn = () => ({
  setup () {
    return {
      types,
    }
  },
  template: `
    <FormKit
      :type="types.date"
      value="1999-01-01"
      label="Birthday"
      help="Enter your birth day"
      validation="required|date_before:2010-01-01"
      validation-visibility="live"
    />
  `,
})
