import { StoryFn } from '@storybook/vue3'
import * as types from '@vuestic/formkit'
import countries from './countries'

export default {
  title: 'Formkit Integration/Dropdown',
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
      types,
      frameworks,
    }
  },
  template: `
    <FormKit
      :type="types.dropdown"
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
      types,
      countries,
    }
  },
  template: `
    <FormKit
      :type="types.dropdown"
      name="country"
      label="Search for a country"
      placeholder="Example: United States"
      searchable
      :options="countries"
    />
  `,
})
