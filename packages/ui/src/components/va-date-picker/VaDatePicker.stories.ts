import { StoryFn } from '@storybook/vue3'
import { userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import VaDatePickerDemo from './VaDatePicker.demo.vue'
import VaDatePicker from './VaDatePicker.vue'

export default {
  title: 'VaDatePicker',
  component: VaDatePicker,
  tags: ['autodocs'],
}

export const Default: StoryFn = () => ({
  components: { VaDatePickerDemo },
  template: '<VaDatePickerDemo />',
})

export const WithoutValue: StoryFn = () => ({
  components: { VaDatePicker },
  template: '<VaDatePicker />',
})
WithoutValue.parameters = { chromatic: { disableSnapshot: true } } // Disable Chromatic snapshots to prevent visual test failures due to current date changes.

export const Stateful: StoryFn = () => ({
  components: { VaDatePicker },
  template: '<VaDatePicker stateful />',
})
Stateful.parameters = { chromatic: { disableSnapshot: true } }

export const Readonly: StoryFn = () => ({
  components: { VaDatePicker },
  template: '<VaDatePicker readonly />',
})
Readonly.parameters = { chromatic: { disableSnapshot: true } } // Disable Chromatic snapshots to prevent visual test failures due to current date changes.

export const View: StoryFn = () => ({
  components: { VaDatePicker },

  data: () => ({
    dayView: {
      type: 'day',
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    },
    monthView: {
      type: 'month',
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    },
    yearView: {
      type: 'year',
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    },
  }),
  template: `
  <VaDatePicker readonly v-model:view="dayView" />
  <VaDatePicker readonly v-model:view="monthView" />
  <VaDatePicker readonly v-model:view="yearView" />
  `,
})
View.parameters = { chromatic: { disableSnapshot: true } } // Disable Chromatic snapshots to prevent visual test failures due to current date changes.

export const FirstWeekDay: StoryFn = () => ({
  components: { VaDatePicker },
  template: `
    <VaDatePicker firstWeekday="sunday"/>
    <VaDatePicker firstWeekday="monday"/>
  `,
})
FirstWeekDay.parameters = { chromatic: { disableSnapshot: true } } // Disable Chromatic snapshots to prevent visual test failures due to current date changes.

export const Range: StoryFn = () => ({
  components: { VaDatePicker },
  data: () => ({
    value: {
      start: new Date('2020-01-01T00:00:00.000Z'),
      end: new Date('2020-01-02T00:00:00.000Z'),
    },
  }),
  template: `
    {{ value }}
    <VaDatePicker v-model="value" />
  `,
})

Range.play = async ({ step, canvasElement }) => {
  const datePicker = canvasElement.querySelector('.va-date-picker')
  expect(datePicker).toBeVisible()

  await step('Click on the date picker to open', async () => {
    await userEvent.click(datePicker!)
  })

  await step('Select a start date', async () => {
    const startDate = canvasElement.querySelectorAll(
      '.va-date-picker-cell',
    )[10]
    await userEvent.click(startDate!)
  })

  await step('Select an end date', async () => {
    const endDate = canvasElement.querySelectorAll('.va-date-picker-cell')[15]
    await userEvent.click(endDate!)
  })

  const selectedDates = canvasElement.querySelectorAll(
    '.va-date-picker-cell_selected',
  )
  expect(selectedDates.length).toBeGreaterThan(1)
}
