import { defineComponent } from 'vue'
import VaSpacingPlayground from './VaSpacingPlayground.demo.vue'

export default {
  title: 'VaSpacingPlayground',
  component: VaSpacingPlayground,
}

export const Default = defineComponent({
  components: { VaSpacingPlayground },
  template: '<VaSpacingPlayground/>',
})
