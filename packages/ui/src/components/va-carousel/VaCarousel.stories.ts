import { defineComponent } from 'vue'
import VaCarousel from './VaCarousel.demo.vue'

export default {
  title: 'VaCarousel',
  component: VaCarousel,
}

export const Default = defineComponent({
  components: { VaCarousel },
  template: '<VaCarousel/>',
})
