import { defineComponent } from 'vue'
import VaCounterDemo from './VaCounter.demo.vue'
import VaCounter from './VaCounter.vue'

export default {
  title: 'VaCounter',
  component: VaCounter,
}

export const Default = defineComponent({
  components: { VaCounter: VaCounterDemo },
  template: '<VaCounter/>',
})

export const Loading = () => ({
  components: { VaCounter },
  template: '<VaCounter loading />',
})
