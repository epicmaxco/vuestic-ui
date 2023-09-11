import { defineComponent } from 'vue'
import VaLayoutDemo from './VaLayout.demo.vue'

export default {
  title: 'VaLayout',
  component: VaLayoutDemo,
}

export const Default = defineComponent({
  components: { VaLayoutDemo },
  template: '<VaLayoutDemo />',
})
