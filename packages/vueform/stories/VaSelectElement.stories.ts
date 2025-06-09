import { StoryFn } from '@storybook/vue3'

export default {
  title: 'Vueform Integration/Select',
}

export const Default: StoryFn = () => ({
  setup() {
    const frameworks = [
      { text: 'React', value: 'react' },
      { text: 'Vue', value: 'vue' },
      { text: 'Angular', value: 'angular' },
      { text: 'Svelte', value: 'svelte' },
    ]
    return {
      frameworks,
    }
  },
  template: `
  <Vueform>
      <VaSelectElement
        name="framework"
        autocomplete
        :options="frameworks"
        label="Choose a framework"
      />
  </Vueform>
  `,
})
