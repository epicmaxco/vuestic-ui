import { defineComponent } from 'vue'
import VaRatingItem from './VaRatingItem.demo.vue'

export default {
  title: 'VaRatingItem',
  component: VaRatingItem,
}

export const Default = defineComponent({
  components: { VaRatingItem },
  template: '<VaRatingItem/>',
})
