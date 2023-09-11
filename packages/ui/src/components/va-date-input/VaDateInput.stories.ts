import { defineComponent } from 'vue'
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
