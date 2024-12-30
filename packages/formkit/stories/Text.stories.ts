import { StoryFn } from '@storybook/vue3'

export default {
  title: 'Formkit Integration/Text',
}

export const Default: StoryFn = () => ({
  template: `
    <div class="w-1/5 grid gap-6">
      <h2>Basic Example</h2>
      <FormKit
        type="text"
        label="Your username"
        value="calypso"
        help="Pick a username people will remember!"
        validation="required"
        validation-visibility="live"
        prefixIcon="check"
      />

      <h2>Cast to number</h2>
      <FormKit
        type="text"
        label="Atmospheric pressure"
        name="pressure"
        validation="number"
        validation-visibility="live"
        help="My value will be a number if it can be parsed by parseFloat"
        value="29.82"
      />
    </div>
  `,
})
