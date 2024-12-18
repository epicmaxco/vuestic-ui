import { StoryFn } from '@storybook/vue3'
import * as types from '@vuestic/formkit'
import { ref } from 'vue'

export default {
  title: 'Formkit Integration/Radio',
}

export const Radio: StoryFn = () => ({
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
