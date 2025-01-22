import { StoryFn } from '@storybook/vue3'

export default {
  title: 'Formkit Integration/ToggleButtons',
}

export const Default: StoryFn = () => ({
  template: `
    <FormKit
      type="togglebuttons"
      name="transportation"
      label="Travel Preference"
      :options="['Car', 'Airplane', 'Train', 'Hoverboard']"
    />
  `,
})
