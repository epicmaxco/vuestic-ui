import { defineComponent } from 'vue'
import VaBacktop from './VaBacktop.demo.vue'

export default {
  title: 'VaBacktop',
  component: VaBacktop,
}

export const Default = defineComponent({
  components: { VaBacktop },
  template: '<VaBacktop/>',
})
