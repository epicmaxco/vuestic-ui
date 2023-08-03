import { defineComponent } from 'vue'
import VaDateInput from './VaDateInput.demo.vue'

export default {
  title: 'VaDateInput',
  component: VaDateInput,
}

export const Default = defineComponent({
  components: { VaDateInput },
  template: '<VaDateInput/>',
})
