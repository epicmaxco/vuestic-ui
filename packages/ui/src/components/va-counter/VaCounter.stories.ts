import { defineComponent } from 'vue'
import VaCounterDemo from './VaCounter.demo.vue'
import VaCounter from './VaCounter.vue'

export default {
  title: 'VaCounter',
  component: VaCounter,
}

export const OldDemos = () => ({
  components: { VaCounterDemo },
  template: '<VaCounterDemo />',
})

export const Default = () => ({
  components: { VaCounter },
  template: '<VaCounter/>',
})

export const Loading = () => ({
  components: { VaCounter },
  template: '<VaCounter loading />',
})
