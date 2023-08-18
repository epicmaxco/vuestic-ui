import { defineComponent } from 'vue'
import VaAffix from './VaAffix.demo.vue'

export default {
  title: 'VaAffix',
  component: VaAffix,
}

export const Default = defineComponent({
  components: { VaAffix },
  template: '<VaAffix/>',
})
