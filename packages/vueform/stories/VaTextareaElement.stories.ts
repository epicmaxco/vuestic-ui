import { StoryFn } from '@storybook/vue3'

export default {
  title: 'Vueform Integration/Textarea',
}

export const Default: StoryFn = () => ({
  template: `
  <Vueform>
    <VaTextareaElement
      name="textarea"
      rules="required|max:255|min:5"
      label="Bio"
    />
  </Vueform>
  `,
})
