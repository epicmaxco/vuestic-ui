import { defineComponent } from 'vue'
import VaTimelineItem from './VaTimelineItem.demo.vue'

export default {
  title: 'VaTimelineItem',
  component: VaTimelineItem,
}

export const Default = defineComponent({
  components: { VaTimelineItem },
  template: '<VaTimelineItem/>',
})
