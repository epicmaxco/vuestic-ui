import { defineComponent } from 'vue'
import VaForm from './VaForm.demo.vue'

export default {
  title: 'VaForm',
  component: VaForm,
}

export const Default = defineComponent({
  components: { VaForm },
  template: '<VaForm/>',
})
