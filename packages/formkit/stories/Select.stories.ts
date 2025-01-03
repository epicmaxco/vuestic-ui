import { StoryFn } from '@storybook/vue3'
import countries from './countries'

export default {
  title: 'Formkit Integration/Select',
}

export const Default: StoryFn = () => ({

  setup () {
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
    <FormKit
      type="select"
      name="framework"
      label="Choose your favorite frontend framework"
      placeholder="Backbone.js"
      :options="frameworks"
    />
  `,
})

export const Autocomplete: StoryFn = () => ({

  setup () {
    return {
      countries,
    }
  },
  template: `
    <FormKit
      type="select"
      name="country"
      label="Search for a country"
      placeholder="Example: United States"
      searchable
      :options="countries"
    />
  `,
})
