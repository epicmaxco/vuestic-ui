import { defineComponent } from 'vue'
import VaSplit from './VaSplit.demo.vue'

export default {
  title: 'VaSplit',
  component: VaSplit,
}

export const Default = defineComponent({
  components: { VaSplit },
  template: '<VaSplit/>',
})
