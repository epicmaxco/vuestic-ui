import { defineComponent } from 'vue'
import VaTimeInput from './VaTimeInput.demo.vue'

export default {
  title: 'VaTimeInput',
  component: VaTimeInput,
}

export const Default = defineComponent({
  components: { VaTimeInput },
  template: '<VaTimeInput/>',
})
