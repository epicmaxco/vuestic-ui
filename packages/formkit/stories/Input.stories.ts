import { StoryFn } from '@storybook/vue3'

export default {
  title: 'Formkit Integration/Input',
}

export const Default: StoryFn = () => ({
  template: `
    <div class="w-1/5 grid gap-6">
      <h2>Text input</h2>
      <FormKit
        type="text"
        label="Your username"
        value="calypso"
        help="Pick a username people will remember!"
        validation="required"
        validation-visibility="live"
        prefixIcon="check"
      />

      <h2>Email</h2>
      <FormKit
        type="email"
        label="Student email address"
        help="Please enter your student email address."
        validation="required|email|ends_with:.edu"
        validation-visibility="live"
        placeholder="vikas@school.edu"
      />

      <h2>Number</h2>
      <FormKit
        type="number"
        help="What temperature should the house be?"
        label="Thermostat"
        name="temperature"
        value="25"
        step="1"
      />

      <h2>Password</h2>
      <FormKit type="group">
        <h4>Create a new password</h4>
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

      <h2>Telephone</h2>
      <FormKit
        type="tel"
        label="Phone number"
        placeholder="xxx-xxx-xxxx"
        validation="matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
        :validation-messages="{
          matches: 'Phone number must be in the format xxx-xxx-xxxx',
        }"
        validation-visibility="dirty"
      />

      <h2>Url</h2>
      <FormKit
        type="url"
        label="Favorite website"
        placeholder="https://www.example.com..."
        validation="required|url"
        help="What is your favorite website?"
      />
    </div>
  `,
})
