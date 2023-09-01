import { defineComponent } from 'vue'
import VaInputWrapper from './VaInputWrapper.demo.vue'

export default {
  title: 'VaInputWrapper',
  component: VaInputWrapper,
}

export const Default = defineComponent({
  components: { VaInputWrapper },
  template: '<VaInputWrapper/>',
})
