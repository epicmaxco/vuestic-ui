import { defineComponent } from 'vue'
import VaFileUpload from './VaFileUpload.demo.vue'

export default {
  title: 'VaFileUpload',
  component: VaFileUpload,
}

export const Default = defineComponent({
  components: { VaFileUpload },
  template: '<VaFileUpload/>',
})
