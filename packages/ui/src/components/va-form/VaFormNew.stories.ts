import { defineComponent } from 'vue'
import VaFormNew from './VaFormNew.demo.vue'

export default {
  title: 'VaFormNew',
  component: VaFormNew,
}

export const Default = defineComponent({
  components: { VaFormNew },
  template: '<VaFormNew/>',
})
