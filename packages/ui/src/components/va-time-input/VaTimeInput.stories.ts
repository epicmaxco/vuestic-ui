import { defineComponent } from 'vue'
import VaTimeInputDemo from './VaTimeInput.demo.vue'
import VaTimeInput from './VaTimeInput.vue'

export default {
  title: 'VaTimeInput',
  component: VaTimeInput,
}

export const Default = defineComponent({
  components: { VaTimeInput: VaTimeInputDemo },
  template: '<VaTimeInput/>',
})

export const Loading = () => ({
  components: { VaTimeInput },
  template: '<VaTimeInput loading />',
})

export const Clearable = () => ({
  components: { VaTimeInput },
  data () {
    return {
      value: new Date('2020-01-01T00:00:00.000Z'),
    }
  },
  template: '<VaTimeInput clearable v-model="value" />',
})
