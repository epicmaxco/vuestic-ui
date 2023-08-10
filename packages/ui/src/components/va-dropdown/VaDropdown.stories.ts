import { defineComponent } from 'vue'
import VaDropdown from './VaDropdown.demo.vue'

export default {
  title: 'VaDropdown',
  component: VaDropdown,
}

export const Default = defineComponent({
  components: { VaDropdown },
  template: '<VaDropdown/>',
})
