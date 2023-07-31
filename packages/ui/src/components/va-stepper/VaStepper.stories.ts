import { defineComponent } from 'vue'
import VaStepper from './VaStepper.demo.vue'

export default {
  title: 'VaStepper',
  component: VaStepper,
}

export const Default = defineComponent({
  components: { VaStepper },
  template: '<VaStepper/>',
})
