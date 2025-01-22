import { StoryFn } from '@storybook/vue3'

export default {
  title: 'Formkit Integration/Submit',
}

export const Default: StoryFn = () => ({
  template: `
    <FormKit
      type="submit"
      label="Checkout my label"
      help="You can use the label prop."
    />
  `,
})
