import { defineComponent } from 'vue'
import VaSidebar from './VaSidebar.demo.vue'

export default {
  title: 'VaSidebar',
  component: VaSidebar,
}

export const Default = defineComponent({
  components: { VaSidebar },
  template: '<VaSidebar/>',
})
