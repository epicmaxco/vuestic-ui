import { StoryFn } from '@storybook/vue3'

export default {
  title: 'Formkit Integration/Color',
}

export const Default: StoryFn = () => ({
  template: `
    <div class="w-1/5">
      <FormKit
        type="color"
        value="#00FF00"
        label="Select a color"
        help="Select your favorite color."
      />
    </div>
  `,
})
