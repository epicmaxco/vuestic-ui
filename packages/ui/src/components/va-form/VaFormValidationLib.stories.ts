import { defineComponent } from 'vue'
import VaFormValidationLib from './VaFormValidationLib.demo.vue'

export default {
  title: 'VaFormValidationLib',
  component: VaFormValidationLib,
}

export const Default = defineComponent({
  components: { VaFormValidationLib },
  template: '<VaFormValidationLib/>',
})
