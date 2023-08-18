import { defineComponent } from 'vue'
import VaScrollContainer from './VaScrollContainer.demo.vue'

export default {
  title: 'VaScrollContainer',
  component: VaScrollContainer,
}

export const Default = defineComponent({
  components: { VaScrollContainer },
  template: '<VaScrollContainer/>',
})
