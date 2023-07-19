import { defineComponent } from 'vue'
import VaSelect from './VaSelect.demo.vue'

export default {
  title: 'VaSelect',
  component: VaSelect,
}

export const Default = defineComponent({
  components: { VaSelect },
  template: '<VaSelect/>',
})
