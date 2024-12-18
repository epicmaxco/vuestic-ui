import { StoryFn } from '@storybook/vue3'
import * as types from '@vuestic/formkit'
import { ref } from 'vue'

export default {
  title: 'Formkit Integration/ToggleButtons',
}

export const Default: StoryFn = () => ({
  setup () {
    return {
      types,
    }
  },
  template: `
    <FormKit
      :type="types.togglebuttons"
      name="transportation"
      label="Travel Preference"
      :options="['Car', 'Airplane', 'Train', 'Hoverboard']"
    />
  `,
})
