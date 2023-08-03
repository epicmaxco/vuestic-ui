import { defineComponent } from 'vue'
import VaValue from './VaValue.demo.vue'

export default {
  title: 'VaValue',
  component: VaValue,
}

export const Default = defineComponent({
  components: { VaValue },
  template: '<VaValue/>',
})
