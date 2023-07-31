import { defineComponent } from 'vue'
import VaButtonToggle from './VaButtonToggle.demo.vue'

export default {
  title: 'VaButtonToggle',
  component: VaButtonToggle,
}

export const Default = defineComponent({
  components: { VaButtonToggle },
  template: '<VaButtonToggle/>',
})
