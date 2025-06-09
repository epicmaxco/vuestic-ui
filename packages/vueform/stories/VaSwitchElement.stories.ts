import { StoryFn } from '@storybook/vue3'

export default {
  title: 'Vueform Integration/Switch',
}

export const Default: StoryFn = () => ({
  template: `
  <Vueform>
    <VaSwitchElement
    name="terms"
    label="I accept the Terms of Use"
    rules="accepted"
    />
  </Vueform>
  `,
})
