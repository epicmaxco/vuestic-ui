import { defineComponent } from 'vue'
import VaHover from './VaHover.demo.vue'

export default {
  title: 'VaHover',
  component: VaHover,
}

export const Default = defineComponent({
  components: { VaHover },
  template: '<VaHover/>',
})
