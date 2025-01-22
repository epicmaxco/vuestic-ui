import { StoryFn } from '@storybook/vue3'
import { ref } from 'vue'

export default {
  title: 'Formkit Integration/Slider',
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
      type="slider"
      label="Volume"
      min="0"
      max="11"
      help="Select your volume level."
    />
    <pre wrap>{{ value }}</pre>
  `,
})
