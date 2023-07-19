import { defineComponent } from 'vue'
import VaCard from './VaCard.demo.vue'

export default {
  title: 'VaCard',
  component: VaCard,
}

export const Default = defineComponent({
  components: { VaCard },
  template: '<VaCard/>',
})
