import { defineComponent } from 'vue'
import VaToast from './VaToast.demo.vue'

export default {
  title: 'VaToast',
  component: VaToast,
}

export const Default = defineComponent({
  components: { VaToast },
  template: '<VaToast/>',
})
