import { defineComponent } from 'vue'
import VaRating from './VaRating.demo.vue'

export default {
  title: 'VaRating',
  component: VaRating,
}

export const Default = defineComponent({
  components: { VaRating },
  template: '<VaRating/>',
})
