import { defineComponent } from 'vue'
import VaTimePicker from './VaTimePicker.demo.vue'

export default {
  title: 'VaTimePicker',
  component: VaTimePicker,
}

export const Default = defineComponent({
  components: { VaTimePicker },
  template: '<VaTimePicker/>',
})
