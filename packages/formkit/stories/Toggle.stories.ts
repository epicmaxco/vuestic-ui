import { StoryFn } from '@storybook/vue3'
import { ref } from 'vue'
import * as types from '../src'

export default {
  title: 'Formkit Integration/Toggle',
}

export const Default: StoryFn = () => ({
  setup () {
    const value = ref(false)

    return {
      types,
      value,
    }
  },
  template: `
    <FormKit
      :type="types.toggle"
      v-model="value"
      name="toggle"
      label="Airplane mode"
    />
  `,
})
