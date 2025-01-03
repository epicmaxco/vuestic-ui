import { StoryFn } from '@storybook/vue3'
import { ref } from 'vue'

export default {
  title: 'Formkit Integration/Rating',
}

export const Default: StoryFn = () => ({
  setup () {
    const value = ref(0)
    return {
      value,
    }
  },
  template: `
    <FormKit
      type="rating"
      name="rating"
      label="Did we provide good service?"
    />
  `,
})
