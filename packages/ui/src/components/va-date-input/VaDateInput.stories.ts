import { ref } from 'vue'
import VaDateInputDemo from './VaDateInput.demo.vue'
import VaDateInput from './VaDateInput.vue'
import { defineStory } from '../../../.storybook/types'

export default {
  title: 'VaDateInput',
  component: VaDateInput,
  tags: ['autodocs'],
}

export const OldDemos = () => ({
  components: { VaDateInputDemo },
  template: '<VaDateInputDemo />',
})

export const Default = () => ({
  components: { VaDateInput: VaDateInput },
  template: '<VaDateInput />',
})

export const Loading = () => ({
  components: { VaDateInput },
  template: '<VaDateInput loading />',
})

const isFriday = (date: Date) => {
  if (!date) { return 'Date must be Friday.' }

  return date.getDay() === 5 || 'Date must be Friday.'
}

export const ValidationRules = () => ({
  components: { VaDateInput },
  data () {
    return {
      value: new Date('2020-01-01T00:00:00.000Z'),
    }
  },
  methods: { isFriday },
  template: '<VaDateInput v-model="value" :rules="[isFriday]" />',
})

export const ValidationImmediate = defineStory({
  story: () => ({
    components: { VaDateInput },
    data () {
      return {
        value: new Date('2020-01-01T00:00:00.000Z'),
      }
    },
    methods: { isFriday },
    template: '<VaDateInput v-model="value" :rules="[isFriday]" immediate-validation />',
  }),

  async tests ({ canvasElement, step, expect }) {
    step('Expect error when mounted even if value is incorrect', () => {
      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).not.toBeNull()
    })
  },
})

export const ValidationDirtyState = defineStory({
  story: () => ({
    components: { VaDateInput },
    data () {
      return {
        value: new Date('2020-01-01T00:00:00.000Z'),
      }
    },
    methods: { isFriday },
    template: `
      [isDirty]: {{ $refs.component?.isDirty }}
      <VaDateInput v-model="value" :rules="[isFriday]" ref="component" />
    `,
  }),

  async tests ({ canvasElement, step, expect, event, sleep }) {
    step('Expect no error when mounted even if value is incorrect', () => {
      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).toBeNull()
    })

    step('Expect error when opened and closed', async () => {
      await event.click(canvasElement.querySelector('.va-input-wrapper__field')!)

      await sleep(100)
      const tuesday = document.body.querySelectorAll('.va-day-picker__calendar__day-wrapper')[2 + 7].children[0] as HTMLElement

      await event.hover(tuesday)
      await event.click(tuesday)

      await sleep(100)

      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).not.toBeNull()
    })
  },
})

export const ValidationTouchedState = defineStory({
  story: () => ({
    components: { VaDateInput },
    data () {
      return {
        value: new Date('2020-01-01T00:00:00.000Z'),
      }
    },
    methods: {
      isFriday,
      reset () { this.$refs.component?.reset() },
    },
    template: `
      [isTouched]: {{ $refs.component?.isTouched }}
      <VaDateInput v-model="value" :rules="[isFriday]" ref="component" />
    `,
  }),

  async tests ({ canvasElement, step, expect, event, sleep, methods }) {
    step('Expect error when opened and closed', async () => {
      await event.click(canvasElement.querySelector('.va-input-wrapper__field')!)

      await sleep(100)

      await event.click(document.body)

      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).not.toBeNull()
    })

    step('Expect error when input blur', async () => {
      methods.reset()

      await event.focus(canvasElement.querySelector('.va-input-wrapper__field')!)
      await event.blur(canvasElement.querySelector('.va-input-wrapper__field')!)

      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).not.toBeNull()
    })
  },
})

export const Clearable = () => ({
  components: { VaDateInput },
  data () {
    return {
      value: new Date('2020-01-01T00:00:00.000Z'),
    }
  },
  template: '<VaDateInput clearable v-model="value" />',
})

export const Formatting = () => ({
  components: { VaDateInput },
  setup () {
    const emptyValue = ref(null as Date | null)
    const emptyValueWithFormat = ref(null as Date | null)
    const emptyValueModeRange = ref(null as { start: Date, end: Date | null } | null)
    const stringValueUTC = ref('2018-12-31T00:00:00')
    const stringValueRFC = ref('Mon, 31 Dec 2018 23:00:00 GMT')
    const dateValue = ref(new Date('2018-12-31T00:00:00'))
    const multipleStandardValue = ref([new Date('2018-12-31T00:00:00').toString()])

    return {
      emptyValue,
      emptyValueWithFormat,
      emptyValueModeRange,
      stringValueUTC,
      stringValueRFC,
      dateValue,
      multipleStandardValue,
    }
  },
  template: `
  <p>[emptyValue]: {{ emptyValue }} (isDate: {{ emptyValue != null && typeof emptyValue === 'object' && 'getTime' in emptyValue }})</p>
  <p><VaDateInput v-model="emptyValue" /></p>

  <p>[emptyValueWithFormat]: {{ emptyValueWithFormat }} (isDate: {{ emptyValueWithFormat != null && typeof emptyValueWithFormat === 'object' && 'getTime' in emptyValueWithFormat }})</p>
  <p> <VaDateInput v-model="emptyValueWithFormat" :format-value="(date) => date.toISOString()" /></p>

  <p>[emptyValueModeRange]: {{ emptyValueModeRange }}</p>
  <p> <VaDateInput v-model="emptyValueModeRange" mode="range" /></p>

  <p>[stringValueUTC]: {{ stringValueUTC }}</p>
  <p><VaDateInput v-model="stringValueUTC" /></p>

  <p>[stringValueRFC]: {{ stringValueRFC }}</p>
  <p><VaDateInput v-model="stringValueRFC" /></p>

  <p>[dateValue]: {{ dateValue }}</p>
  <p><VaDateInput v-model="dateValue" /></p>

  <p>[multipleStandardValue]: {{ multipleStandardValue }}</p>
  <p><VaDateInput v-model="multipleStandardValue" mode="multiple" /></p>
  `,
})

export const AsyncDate = () => ({
  components: { VaDateInput },
  setup () {
    const stringValueUTC = ref(null as string | null)

    const init = async () => {
      await asyncTest()
      stringValueUTC.value = '2018-12-31T00:00:00'
    }

    const asyncTest = async () => {
      return true
    }

    init()

    return {
      stringValueUTC,
    }
  },
  template: `
  <p>[stringValueUTC]: {{ stringValueUTC }}</p>
  <VaDateInput v-model="stringValueUTC" />
  `,
})

export const NullValue = () => ({
  components: { VaDateInput },
  data () {
    return {
      value: null,
    }
  },
  template: `
  [[value]]: {{ value === null ? 'null' : value }}
  <VaDateInput v-model="value" clearable manual-input clear-value="null" />
  `,
})

export const EventListeners = () => ({
  components: { VaDateInput },
  data () {
    return {
      value: null,
    }
  },
  methods: {
    onKeydown () {
      console.log('onKeydown')
    },
  },
  template: `
  [[value]]: {{ value === null ? 'null' : value }}
  <VaDateInput v-model="value" @keydown="onKeydown" manual-input />
  `,
})

export const Range = () => ({
  components: { VaDateInput },

  data () {
    return {
      value: { start: new Date('2020-01-01T00:00:00.000Z'), end: new Date('2020-01-02T00:00:00.000Z') },
    }
  },

  template: `
  {{ value }}
  <VaDateInput v-model="value" />
  `,
})
