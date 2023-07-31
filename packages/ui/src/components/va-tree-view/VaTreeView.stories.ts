import { defineComponent } from 'vue'
import VaTreeView from './VaTreeView.demo.vue'

export default {
  title: 'VaTreeView',
  component: VaTreeView,
}

export const Default = defineComponent({
  components: { VaTreeView },
  template: '<VaTreeView/>',
})
