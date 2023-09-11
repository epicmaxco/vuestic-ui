import { defineComponent } from 'vue'
import VaButtonDropdown from './VaButtonDropdown.demo.vue'

export default {
  title: 'VaButtonDropdown',
  component: VaButtonDropdown,
}

export const Default = defineComponent({
  components: { VaButtonDropdown },
  template: '<VaButtonDropdown/>',
})
