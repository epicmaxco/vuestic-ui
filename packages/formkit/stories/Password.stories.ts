import { StoryFn } from '@storybook/vue3'

export default {
  title: 'Formkit Integration/Password',
}

export const Default: StoryFn = () => ({
  template: `
    <FormKit type="group">
      <h2>Create a new password</h2>
      <FormKit
        type="password"
        name="password"
        value="super-secret"
        label="Password"
        help="Enter a new password"
        validation="required"
        validation-visibility="live"
      />
      <FormKit
        type="password"
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
