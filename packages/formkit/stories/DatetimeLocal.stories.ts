import { StoryFn } from '@storybook/vue3'
import * as types from '../src'

export default {
  title: 'Formkit Integration/DatetimeLocal',
}

export const Default: StoryFn = () => ({
  setup () {
    return {
      types,
    }
  },
  template: `
    <FormKit
      :type="types.datetimeLocal"
      value="2020-03-13T18:22"
      label="End of the world"
      help="When will the end of the world take place?"
      validation="required|date_after"
      validation-visibility="live"
    />
  `,
})
