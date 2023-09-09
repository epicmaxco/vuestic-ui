import { defineComponent } from 'vue'
import VaSelectDemo from './VaSelect.demo.vue'
import VaSelect from './VaSelect.vue'

export default {
  title: 'VaSelect',
  component: VaSelect,
}

export const Default = defineComponent({
  components: { VaSelect: VaSelectDemo },
  template: '<VaSelect/>',
})

export const Loading = () => ({
  components: { VaSelect },
  template: '<VaSelect loading />',
})
