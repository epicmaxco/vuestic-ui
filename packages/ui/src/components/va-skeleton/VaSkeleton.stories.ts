import { defineComponent } from 'vue'
import VaSkeleton from './VaSkeleton.demo.vue'

export default {
  title: 'VaSkeleton',
  component: VaSkeleton,
}

export const Default = defineComponent({
  components: { VaSkeleton },
  template: '<VaSkeleton/>',
})
