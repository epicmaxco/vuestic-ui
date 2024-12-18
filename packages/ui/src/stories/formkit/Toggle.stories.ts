import { StoryFn } from '@storybook/vue3'
import * as types from '@vuestic/formkit'
import { ref } from 'vue'

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
