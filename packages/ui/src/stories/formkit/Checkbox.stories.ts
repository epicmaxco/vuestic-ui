import { StoryFn } from '@storybook/vue3'
import * as types from '@vuestic/formkit'
import { ref } from 'vue'

export default {
  title: 'Formkit Integration/Checkbox',
}

export const SingleCheckbox: StoryFn = () => ({
  setup () {
    const value = ref(true)
    return {
      types,
      value,
    }
  },
  template: `
    <FormKit
      :type="types.checkbox"
      label="Terms and Conditions"
      help="Do you agree to our terms of service?"
      name="terms"
      v-model="value"
      validation="accepted"
      validation-visibility="dirty"
    />
  `,
})
