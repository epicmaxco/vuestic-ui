import { defineComponent } from 'vue'
import VaInput from './VaInput.demo.vue'

export default {
  title: 'VaInput',
  component: VaInput,
}

export const Default = defineComponent({
  components: { VaInput },
  template: '<VaInput/>',
})
