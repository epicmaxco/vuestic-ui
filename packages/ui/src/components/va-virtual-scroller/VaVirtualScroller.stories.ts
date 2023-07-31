import { defineComponent } from 'vue'
import VaVirtualScroller from './VaVirtualScroller.demo.vue'

export default {
  title: 'VaVirtualScroller',
  component: VaVirtualScroller,
}

export const Default = defineComponent({
  components: { VaVirtualScroller },
  template: '<VaVirtualScroller/>',
})
