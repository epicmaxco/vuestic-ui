import { StoryFn } from '@storybook/vue3'
import * as types from '../src'

export default {
  title: 'Formkit Integration/Url',
}

export const Default: StoryFn = () => ({
  setup () {
    return {
      types,
    }
  },
  template: `
    <FormKit
      :type="types.url"
      label="Favorite website"
      placeholder="https://www.example.com..."
      validation="required|url"
      help="What is your favorite website?"
    />
  `,
})
