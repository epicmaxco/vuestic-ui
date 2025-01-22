import { StoryFn } from '@storybook/vue3'

export default {
  title: 'Formkit Integration/Datepicker',
}

export const Default: StoryFn = () => ({
  template: `
    <FormKit
      type="datepicker"
      value="1999-01-01"
      label="Birthday"
      help="Enter your birth day"
      validation="required|date_before:2010-01-01"
      validation-visibility="live"
    />
  `,
})
