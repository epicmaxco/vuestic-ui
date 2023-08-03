import { defineComponent } from 'vue'
import VaTimelineSeparator from './VaTimelineSeparator.demo.vue'

export default {
  title: 'VaTimelineSeparator',
  component: VaTimelineSeparator,
}

export const Default = defineComponent({
  components: { VaTimelineSeparator },
  template: '<VaTimelineSeparator/>',
})
