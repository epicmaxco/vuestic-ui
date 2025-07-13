import { StoryFn } from '@storybook/vue3'

export default {
  title: 'Vueform Integration/Radio',
}

export const Default: StoryFn = () => ({
  template: `
  <Vueform>
    <VaRadioElement
      name="Language"
      :options="['AngularJS', 'Vue.js', 'React']"
      rules="in:Vue.js,React"
      :messages="{ in: 'Not a valid language' }"
    />
  </Vueform>
  `,
})
