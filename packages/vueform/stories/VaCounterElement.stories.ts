import { StoryFn } from '@storybook/vue3'

export default {
  title: 'Vueform Integration/Counter',
}

export const Default: StoryFn = () => ({
  template: `
  <Vueform>
    <VaCounterElement
      name="Number of seats"
      label="Number of seats"
      rules="integer|min:3"
    />
  </Vueform>
  `,
})
