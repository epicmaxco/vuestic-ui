import { StoryFn } from '@storybook/vue3'

export default {
  title: 'Vueform Integration/Slider',
}

export const Default: StoryFn = () => ({
  template: `
  <Vueform>
    <VaSliderElement
      name="slider"
      track-label-visible
      label="label"
      rules="integer|min:50"
    />
  </Vueform>
  `,
})
