import { StoryFn } from '@storybook/vue3'

export default {
  title: 'Formkit Integration/Date',
}

export const Default: StoryFn = () => ({
  template: `
    <FormKit
      type="date"
      value="1999-01-01"
      label="Birthday"
      help="Enter your birth day"
      validation="required|date_before:2010-01-01"
      validation-visibility="live"
    />
  `,
})

export const Month: StoryFn = () => ({
  template: `
    <FormKit
      type="month"
      help="What month were you born?"
      label="Birth month"
      name="birth_month"
      value="1965-09"
    />
  `,
})

export const Week: StoryFn = () => ({
  template: `
    <FormKit
      label="Vacation"
      type="week"
      help="What week will you travel to Fiji?"
      value="2025-W02"
    />
  `,
})
