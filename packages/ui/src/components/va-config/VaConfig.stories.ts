import { defineComponent } from 'vue'
import VaConfig from './VaConfig.demo.vue'

export default {
  title: 'VaConfig',
  component: VaConfig,
}

export const Default = defineComponent({
  components: { VaConfig },
  template: '<VaConfig/>',
})
