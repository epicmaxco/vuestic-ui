import { defineComponent } from 'vue'
import VaCssGridTest from './VaCssGridTest.demo.vue'

export default {
  title: 'VaCssGridTest',
  component: VaCssGridTest,
}

export const Default = defineComponent({
  components: { VaCssGridTest },
  template: '<VaCssGridTest/>',
})
