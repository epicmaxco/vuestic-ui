import { defineComponent } from 'vue'
import VaBreakpoints from './VaBreakpoints.demo.vue'

export default {
  title: 'VaBreakpoints',
  component: VaBreakpoints,
}

export const Default = defineComponent({
  components: { VaBreakpoints },
  template: '<VaBreakpoints/>',
})
