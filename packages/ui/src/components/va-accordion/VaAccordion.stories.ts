import { defineComponent } from 'vue'
import VaAccordion from './VaAccordion.demo.vue'

export default {
  title: 'VaAccordion',
  component: VaAccordion,
}

export const Default = defineComponent({
  components: { VaAccordion },
  template: '<VaAccordion/>',
})
