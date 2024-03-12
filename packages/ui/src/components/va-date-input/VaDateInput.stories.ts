import { defineComponent, ref } from 'vue'
import VaDateInputDemo from './VaDateInput.demo.vue'
import VaDateInput from './VaDateInput.vue'

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

export const ValidationRules = () => ({
  components: { VaDateInput },
  data () {
    return {
      value: new Date('2020-01-01T00:00:00.000Z'),
    }
  },
  methods: {
    isFriday (date: Date) {
      return date.getDay() === 5 || 'Date must be Friday.'
    },
  },
  template: '<VaDateInput v-model="value" :rules="[isFriday]" immediate-validation />',
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
