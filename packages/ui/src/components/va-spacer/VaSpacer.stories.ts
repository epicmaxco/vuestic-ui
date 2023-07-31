import { defineComponent } from 'vue'
import VaSpacer from './VaSpacer.demo.vue'

export default {
  title: 'VaSpacer',
  component: VaSpacer,
}

export const Default = defineComponent({
  components: { VaSpacer },
  template: '<VaSpacer/>',
})
