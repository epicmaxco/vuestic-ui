import { StoryFn } from '@storybook/vue3'
import * as types from '@vuestic/formkit'

export default {
  title: 'Formkit Integration/Text',
}

export const Default: StoryFn = () => ({
  setup () {
    return {
      types,
    }
  },
  template: `
    <div class="w-1/5 grid gap-6">
      <h2>Basic Example</h2>
      <FormKit
        :type="types.text"
        label="Your username"
        value="calypso"
        help="Pick a username people will remember!"
        validation="required"
        validation-visibility="live"
      />

      <h2>Cast to number</h2>
      <FormKit
        :type="types.text"
        label="Atmospheric pressure"
        name="pressure"
        validation="number"
        validation-visibility="live"
        help="My value will be a number if it can be parsed by parseFloat"
        value="29.82"
      />
    </div>
  `,
})
