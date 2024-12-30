import { StoryFn } from '@storybook/vue3'
import { ref } from 'vue'

export default {
  title: 'Formkit Integration/Toggle',
}

export const Default: StoryFn = () => ({
  setup () {
    const value = ref(false)

    return {
      value,
    }
  },
  template: `
    <FormKit
      type="toggle"
      v-model="value"
      name="toggle"
      label="Airplane mode"
    />
  `,
})
