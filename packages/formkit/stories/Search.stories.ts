import { StoryFn } from '@storybook/vue3'

export default {
  title: 'Formkit Integration/Search',
}

export const Default: StoryFn = () => ({
  template: `
    <FormKit
      type="search"
      placeholder="Search..."
      label="Search"
      value="Apple Cider"
    />
  `,
})
