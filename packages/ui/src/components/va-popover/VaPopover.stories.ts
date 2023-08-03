import { defineComponent } from 'vue'
import VaPopover from './VaPopover.demo.vue'

export default {
  title: 'VaPopover',
  component: VaPopover,
}

export const Default = defineComponent({
  components: { VaPopover },
  template: '<VaPopover/>',
})
