import { StoryFn } from '@storybook/vue3'

export default {
  title: 'Vueform Integration/TimeInput',
}

export const Default: StoryFn = () => ({
  template: `
  <Vueform>
    <VaTimeInputElement
      name="time"
      clearable
      label="Time"
      rules="required"
    />
  </Vueform>
  `,
})
