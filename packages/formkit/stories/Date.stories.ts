import { StoryFn } from '@storybook/vue3'
import * as types from '../src'

export default {
  title: 'Formkit Integration/Date',
}

export const Default: StoryFn = () => ({
  setup () {
    return {
      types,
    }
  },
  template: `
    <FormKit
      :type="types.date"
      value="1999-01-01"
      label="Birthday"
      help="Enter your birth day"
      validation="required|date_before:2010-01-01"
      validation-visibility="live"
    />
  `,
})

export const Month: StoryFn = () => ({
  setup () {
    return {
      types,
    }
  },
  template: `
    <FormKit
      :type="types.month"
      help="What month were you born?"
      label="Birth month"
      name="birth_month"
      value="1965-09"
    />
  `,
})

export const Week: StoryFn = () => ({
  setup () {
    return {
      types,
    }
  },
  template: `
    <FormKit
      label="Vacation"
      :type="types.week"
      help="What week will you travel to Fiji?"
      value="2025-W02"
    />
  `,
})
