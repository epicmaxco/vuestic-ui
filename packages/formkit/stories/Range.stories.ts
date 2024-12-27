import { StoryFn } from '@storybook/vue3'
import { ref } from 'vue'
import * as types from '../src'

export default {
  title: 'Formkit Integration/Range',
}

export const Default: StoryFn = () => ({
  setup () {
    const value = ref(true)
    return {
      types,
      value,
    }
  },
  template: `
    <FormKit
      v-model="value"
      :type="types.range"
      label="Volume"
      min="0"
      max="11"
      help="Select your volume level."
    />
    <pre wrap>{{ value }}</pre>
  `,
})
