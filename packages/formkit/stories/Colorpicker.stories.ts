import { StoryFn } from '@storybook/vue3'
import * as types from '../src'

export default {
  title: 'Formkit Integration/Colorpicker',
}

export const Default: StoryFn = () => ({
  setup () {
    return {
      types,
    }
  },
  template: `
    <FormKit
      :type="types.colorpicker"
      value="#DE1B1B"
      label="A default colorpicker input"
      help="Just the way it comes out of the box."
      indicator="square"
    />
  `,
})
