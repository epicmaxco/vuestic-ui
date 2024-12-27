import { StoryFn } from '@storybook/vue3'
import * as types from '../src'

export default {
  title: 'Formkit Integration/Number',
}

export const Default: StoryFn = () => ({
  setup () {
    return {
      types,
    }
  },
  template: `
    <div class="w-1/5 grid gap-6">
      <FormKit
        :type="types.number"
        help="What temperature should the house be?"
        label="Thermostat"
        name="temperature"
        value="25"
        step="1"
      />
    </div>
  `,
})
