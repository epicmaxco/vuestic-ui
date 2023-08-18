import { defineComponent } from 'vue'
import VaDropdownRender from './VaDropdownRender.demo.vue'

export default {
  title: 'VaDropdownRender',
  component: VaDropdownRender,
}

export const Default = defineComponent({
  components: { VaDropdownRender },
  template: '<VaDropdownRender/>',
})
