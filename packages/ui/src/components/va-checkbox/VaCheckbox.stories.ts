import { defineComponent } from 'vue'
import VaCheckbox from './VaCheckbox.demo.vue'

export default {
  title: 'VaCheckbox',
  component: VaCheckbox,
}

export const Default = defineComponent({
  components: { VaCheckbox },
  template: '<VaCheckbox/>',
})
