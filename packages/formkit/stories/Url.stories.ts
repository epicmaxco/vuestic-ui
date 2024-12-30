import { StoryFn } from '@storybook/vue3'

export default {
  title: 'Formkit Integration/Url',
}

export const Default: StoryFn = () => ({
  template: `
    <FormKit
      type="url"
      label="Favorite website"
      placeholder="https://www.example.com..."
      validation="required|url"
      help="What is your favorite website?"
    />
  `,
})
