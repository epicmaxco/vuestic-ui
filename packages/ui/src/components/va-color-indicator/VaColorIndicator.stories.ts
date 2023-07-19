import { defineComponent } from 'vue'
import VaColorIndicator from './VaColorIndicator.demo.vue'

export default {
  title: 'VaColorIndicator',
  component: VaColorIndicator,
}

export const Default = defineComponent({
  components: { VaColorIndicator },
  template: '<VaColorIndicator/>',
})
