import { defineComponent } from 'vue'
import VaModal from './VaModal.demo.vue'

export default {
  title: 'VaModal',
  component: VaModal,
}

export const Default = defineComponent({
  components: { VaModal },
  template: '<VaModal/>',
})
