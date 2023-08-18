import { defineComponent } from 'vue'
import VaChip from './VaChip.demo.vue'

export default {
  title: 'VaChip',
  component: VaChip,
}

export const Default = defineComponent({
  components: { VaChip },
  template: '<VaChip/>',
})
