import { defineComponent } from 'vue'
import VaViewer from './VaViewer.demo.vue'

export default {
  title: 'VaViewer',
  component: VaViewer,
}

export const Default = defineComponent({
  components: { VaViewer },
  template: '<VaViewer/>',
})
