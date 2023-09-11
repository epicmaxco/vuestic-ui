import { defineComponent } from 'vue'
import VaButtonGroup from './VaButtonGroup.demo.vue'

export default {
  title: 'VaButtonGroup',
  component: VaButtonGroup,
}

export const Default = defineComponent({
  components: { VaButtonGroup },
  template: '<VaButtonGroup/>',
})
