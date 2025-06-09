import { StoryFn } from '@storybook/vue3'

export default {
  title: 'Vueform Integration/Checkbox',
}

export const Default: StoryFn = () => ({
  template: `
  <Vueform>
    <VaCheckboxElement
    name="terms"
    label="I accept the Terms of Use"
    rules="accepted"
    />
  </Vueform>
  `,
})
