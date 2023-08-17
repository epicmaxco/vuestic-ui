import { defineComponent } from 'vue'
import VaTabs from './VaTabs.demo.vue'

export default {
  title: 'VaTabs',
  component: VaTabs,
}

export const Default = defineComponent({
  components: { VaTabs },
  template: '<VaTabs/>',
})
