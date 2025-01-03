import { StoryFn } from '@storybook/vue3'

export default {
  title: 'Formkit Integration/Colorpicker',
}

export const Default: StoryFn = () => ({
  template: `
    <FormKit
      type="colorpicker"
      value="#DE1B1B"
      label="A default colorpicker input"
      help="Just the way it comes out of the box."
      indicator="square"
    />
  `,
})
