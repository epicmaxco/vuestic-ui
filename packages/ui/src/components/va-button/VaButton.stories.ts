import { defineComponent } from 'vue'
import VaButton from './VaButton.demo.vue'

export default {
  title: 'VaButton',
  component: VaButton,
}

export const Default = defineComponent({
  components: { VaButton },
  template: '<VaButton/>',
})
