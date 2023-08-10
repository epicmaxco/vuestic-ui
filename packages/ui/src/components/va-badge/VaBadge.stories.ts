import { defineComponent } from 'vue'
import VaBadge from './VaBadge.demo.vue'

export default {
  title: 'VaBadge',
  component: VaBadge,
}

export const Default = defineComponent({
  components: { VaBadge },
  template: '<VaBadge/>',
})
