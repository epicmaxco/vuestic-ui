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

export const Clearable = () => ({
  components: { VaDateInput },
  data () {
    return {
      value: new Date('2020-01-01T00:00:00.000Z'),
    }
  },
  template: '<VaDateInput clearable v-model="value" />',
})

export const AsyncDate = () => ({
  components: { VaDateInput },
  setup () {
    const stringValue = ref(null as string | null)
    const dateValue = ref(null as Date | null)

    const init = async () => {
      await asyncTest()
      dateValue.value = new Date('2018-01-01T00:00:00')
      stringValue.value = '9999-12-31T00:00:00'
    }

    const asyncTest = async () => {
      return true
    }

    init()

    return {
      stringValue,
      dateValue,
    }
  },
  template: `
  <VaDateInput v-model="stringValue" />
  <VaDateInput v-model="dateValue" />
  `,
})
