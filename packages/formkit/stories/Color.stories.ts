import { StoryFn } from '@storybook/vue3'
import * as types from '../src'

export default {
  title: 'Formkit Integration/Color',
}

export const Default: StoryFn = () => ({
  setup () {
    return {
      types,
    }
  },
  template: `
    <div class="w-1/5">
      <FormKit
        :type="types.color"
        value="#00FF00"
        label="Select a color"
        help="Select your favorite color."
      />
    </div>
  `,
})
