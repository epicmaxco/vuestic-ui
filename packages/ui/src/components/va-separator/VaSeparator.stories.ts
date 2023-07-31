import { defineComponent } from 'vue'
import VaSeparator from './VaSeparator.demo.vue'

export default {
  title: 'VaSeparator',
  component: VaSeparator,
}

export const Default = defineComponent({
  components: { VaSeparator },
  template: '<VaSeparator/>',
})
