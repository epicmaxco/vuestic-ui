import { defineComponent } from 'vue'
import VaTimeline from './VaTimeline.demo.vue'

export default {
  title: 'VaTimeline',
  component: VaTimeline,
}

export const Default = defineComponent({
  components: { VaTimeline },
  template: '<VaTimeline/>',
})
