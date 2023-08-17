import { defineComponent } from 'vue'
import VaCounter from './VaCounter.demo.vue'

export default {
  title: 'VaCounter',
  component: VaCounter,
}

export const Default = defineComponent({
  components: { VaCounter },
  template: '<VaCounter/>',
})
