import { defineComponent } from 'vue'
import VaContent from './VaContent.demo.vue'

export default {
  title: 'VaContent',
  component: VaContent,
}

export const Default = defineComponent({
  components: { VaContent },
  template: '<VaContent/>',
})
