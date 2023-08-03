import { defineComponent } from 'vue'
import VaAppBar from './VaAppBar.demo.vue'

export default {
  title: 'VaAppBar',
  component: VaAppBar,
}

export const Default = defineComponent({
  components: { VaAppBar },
  template: '<VaAppBar/>',
})
