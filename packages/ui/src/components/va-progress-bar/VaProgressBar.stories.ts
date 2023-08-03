import { defineComponent } from 'vue'
import VaProgressBar from './VaProgressBar.demo.vue'

export default {
  title: 'VaProgressBar',
  component: VaProgressBar,
}

export const Default = defineComponent({
  components: { VaProgressBar },
  template: '<VaProgressBar/>',
})
