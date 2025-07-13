import { StoryFn } from '@storybook/vue3'

export default {
  title: 'Vueform Integration/DateInput',
}

export const Default: StoryFn = () => ({
  template: `
  <Vueform>
    <VaDateInputElement
      name="date"
      label="Date"
      rules="required|after:today"
    />
  </Vueform>
  `,
})
