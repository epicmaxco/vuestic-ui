import { StoryFn } from '@storybook/vue3'
import * as types from '@vuestic/formkit'
import { ref } from 'vue'

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
