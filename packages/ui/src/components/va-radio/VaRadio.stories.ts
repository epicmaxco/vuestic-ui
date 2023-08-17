import { defineComponent } from 'vue'
import VaRadio from './VaRadio.demo.vue'

export default {
  title: 'VaRadio',
  component: VaRadio,
}

export const Default = defineComponent({
  components: { VaRadio },
  template: '<VaRadio/>',
})
