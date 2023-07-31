import { defineComponent } from 'vue'
import VaInfiniteScroll from './VaInfiniteScroll.demo.vue'

export default {
  title: 'VaInfiniteScroll',
  component: VaInfiniteScroll,
}

export const Default = defineComponent({
  components: { VaInfiniteScroll },
  template: '<VaInfiniteScroll/>',
})
