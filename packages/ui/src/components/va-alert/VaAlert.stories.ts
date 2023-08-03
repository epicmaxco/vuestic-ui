import { defineComponent } from 'vue'
import VaAlert from './VaAlert.demo.vue'

export default {
  title: 'VaAlert',
  component: VaAlert,
}

export const Default = defineComponent({
  components: { VaAlert },
  template: '<VaAlert/>',
})
