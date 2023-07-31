import { defineComponent } from 'vue'
import VaParallax from './VaParallax.demo.vue'

export default {
  title: 'VaParallax',
  component: VaParallax,
}

export const Default = defineComponent({
  components: { VaParallax },
  template: '<VaParallax/>',
})
