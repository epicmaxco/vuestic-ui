import { StoryFn } from '@storybook/vue3'
import * as types from '../src'

export default {
  title: 'Formkit Integration/Password',
}

export const Default: StoryFn = () => ({
  setup () {
    return {
      types,
    }
  },
  template: `
    <FormKit :type="types.group">
      <h2>Create a new password</h2>
      <FormKit
        :type="types.password"
        name="password"
        value="super-secret"
        label="Password"
        help="Enter a new password"
        validation="required"
        validation-visibility="live"
      />
      <FormKit
        :type="types.password"
        name="password_confirm"
        label="Confirm password"
        help="Confirm your new password"
        validation="required|confirm"
        validation-visibility="live"
        validation-label="Password confirmation"
      />
    </FormKit>
  `,
})
