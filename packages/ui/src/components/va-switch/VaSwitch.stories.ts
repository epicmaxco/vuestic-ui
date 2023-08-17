import { defineComponent } from 'vue'
import VaSwitch from './VaSwitch.demo.vue'

export default {
  title: 'VaSwitch',
  component: VaSwitch,
}

export const Default = defineComponent({
  components: { VaSwitch },
  template: '<VaSwitch/>',
})
