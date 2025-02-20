import VaDatePickerDemo from './VaDatePicker.demo.vue'
import VaDatePicker from './VaDatePicker.vue'
import { StoryFn } from '@storybook/vue3'

export default {
  title: 'VaDatePicker',
  component: VaDatePicker,
}

export const Default: StoryFn = () => ({
  components: { VaDatePickerDemo },
  template: '<VaDatePickerDemo />',
})

export const dynamicCurrentDate: StoryFn = () => ({
  components: { VaDatePicker },
  template: `
  <VbDemo>
    <VbCard title="statefull">
      <va-date-picker stateful />
    </VbCard>
    <VbCard title="readonly">
      <va-date-picker readonly />
    </VbCard>
    <VbCard title="without value">
      <va-date-picker />
    </VbCard>
  </VbDemo>
  `,
})
dynamicCurrentDate.parameters = { chromatic: { disableSnapshot: true } }

export const firstWeekDay: StoryFn = () => ({
  components: { VaDatePicker },
  template: `
  <VaDatePicker firstWeekday="sunday"/>
  <VaDatePicker firstWeekday="monday"/>
  `,
})
firstWeekDay.parameters = { chromatic: { disableSnapshot: true } }

export const Range = () => ({
  components: { VaDatePicker },

  data () {
    return {
      value: { start: new Date('2020-01-01T00:00:00.000Z'), end: new Date('2020-01-02T00:00:00.000Z') },
    }
  },

  template: `
  {{ value }}
  <VaDatePicker v-model="value" />
  `,
})
