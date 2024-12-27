import { StoryFn } from '@storybook/vue3'
import * as types from '../src'

export default {
  title: 'Formkit Integration/Telephone',
}

export const Default: StoryFn = () => ({
  setup () {
    return {
      types,
    }
  },
  template: `
    <FormKit
      :type="types.tel"
      label="Phone number"
      placeholder="xxx-xxx-xxxx"
      validation="matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
      :validation-messages="{
        matches: 'Phone number must be in the format xxx-xxx-xxxx',
      }"
      validation-visibility="dirty"
    />
  `,
})
