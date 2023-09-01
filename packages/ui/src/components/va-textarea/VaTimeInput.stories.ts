import { defineComponent } from 'vue'
import VaTextarea from './VaTextarea.demo.vue'

export default {
  title: 'VaTextarea',
  component: VaTextarea,
}

export const Default = defineComponent({
  components: { VaTextarea },
  template: '<VaTextarea />',
})
