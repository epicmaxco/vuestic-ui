import { StoryFn } from '@storybook/vue3'
import { ref } from 'vue'
import * as types from '../src'

export default {
  title: 'Formkit Integration/Radio',
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
      :type="types.radio"
      label="Preferred transportation"
      :options="['E-Bike', 'E-Scooter', 'Electric car', 'Walking', 'Space tube']"
      help="How do you like to get around?"
    />
  `,
})
