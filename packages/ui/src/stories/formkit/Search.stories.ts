import { StoryFn } from '@storybook/vue3'
import * as types from '@vuestic/formkit'

export default {
  title: 'Formkit Integration/Search',
}

export const Default: StoryFn = () => ({
  setup () {
    return {
      types,
    }
  },
  template: `
    <FormKit
      :type="types.search"
      placeholder="Search..."
      label="Search"
      value="Apple Cider"
    />
  `,
})
