import { defineComponent } from 'vue'
import VaInnerLoading from './VaInnerLoading.demo.vue'

export default {
  title: 'VaInnerLoading',
  component: VaInnerLoading,
}

export const Default = defineComponent({
  components: { VaInnerLoading },
  template: '<VaInnerLoading/>',
})
