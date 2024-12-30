import { StoryFn } from '@storybook/vue3'

export default {
  title: 'Formkit Integration/Email',
}

export const Default: StoryFn = () => ({
  template: `
    <div class="w-1/5 grid gap-6">
      <FormKit
        type="email"
        label="Student email address"
        help="Please enter your student email address."
        validation="required|email|ends_with:.edu"
        validation-visibility="live"
        placeholder="vikas@school.edu"
      />
    </div>
  `,
})
