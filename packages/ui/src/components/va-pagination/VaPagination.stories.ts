import { defineComponent } from 'vue'
import VaPagination from './VaPagination.demo.vue'

export default {
  title: 'VaPagination',
  component: VaPagination,
}

export const Default = defineComponent({
  components: { VaPagination },
  template: '<VaPagination/>',
})
