import { defineComponent } from 'vue'
import VaDatePicker from './VaDatePicker.demo.vue'

export default {
  title: 'VaDatePicker',
  component: VaDatePicker,
}

export const Default = defineComponent({
  components: { VaDatePicker },
  template: '<VaDatePicker/>',
})
