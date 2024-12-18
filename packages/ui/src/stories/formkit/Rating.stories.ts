import { StoryFn } from '@storybook/vue3'
import * as types from '@vuestic/formkit'
import { ref } from 'vue'

export default {
  title: 'Formkit Integration/Rating',
}

export const Default: StoryFn = () => ({
  setup () {
    const value = ref(0)
    return {
      types,
      value,
    }
  },
  template: `
    <FormKit
      :type="types.rating"
      name="rating"
      label="Did we provide good service?"
    />
  `,
})
