import { defineComponent } from 'vue'
import VaAspectRatio from './VaAspectRatio.demo.vue'

export default {
  title: 'VaAspectRatio',
  component: VaAspectRatio,
}

export const Default = defineComponent({
  components: { VaAspectRatio },
  template: '<VaAspectRatio/>',
})
