import { defineComponent } from 'vue'
import VaProgressCircle from './VaProgressCircle.demo.vue'

export default {
  title: 'VaProgressCircle',
  component: VaProgressCircle,
}

export const Default = defineComponent({
  components: { VaProgressCircle },
  template: '<VaProgressCircle/>',
})
