import { defineComponent } from 'vue'
import VaNavbar from './VaNavbar.demo.vue'

export default {
  title: 'VaNavbar',
  component: VaNavbar,
}

export const Default = defineComponent({
  components: { VaNavbar },
  template: '<VaNavbar/>',
})
