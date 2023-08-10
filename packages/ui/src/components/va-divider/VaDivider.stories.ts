import { defineComponent } from 'vue'
import VaDivider from './VaDivider.demo.vue'

export default {
  title: 'VaDivider',
  component: VaDivider,
}

export const Default = defineComponent({
  components: { VaDivider },
  template: '<VaDivider/>',
})
