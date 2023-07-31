import { defineComponent } from 'vue'
import VaCollapse from './VaCollapse.demo.vue'

export default {
  title: 'VaCollapse',
  component: VaCollapse,
}

export const Default = defineComponent({
  components: { VaCollapse },
  template: '<VaCollapse/>',
})
