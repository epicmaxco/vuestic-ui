import { StoryFn } from '@storybook/vue3'
import { ref } from 'vue'

export default {
  title: 'Formkit Integration/Range',
}

export const Default: StoryFn = () => ({
  setup () {
    const value = ref(true)
    return {
      value,
    }
  },
  template: `
    <FormKit
      v-model="value"
      type="range"
      label="Volume"
      min="0"
      max="11"
      help="Select your volume level."
    />
    <pre wrap>{{ value }}</pre>
  `,
})
