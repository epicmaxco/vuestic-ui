import { StoryFn } from '@storybook/vue3'
import * as types from '@vuestic/formkit'

export default {
  title: 'Formkit Integration/Submit',
}

export const Default: StoryFn = () => ({
  setup () {
    return {
      types,
    }
  },
  template: `
    <FormKit
      :type="types.submit"
      label="Checkout my label"
      help="You can use the label prop."
    />
  `,
})
