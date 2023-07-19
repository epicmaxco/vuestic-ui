import { defineComponent } from 'vue'
import VaList from './VaList.demo.vue'

export default {
  title: 'VaList',
  component: VaList,
}

export const Default = defineComponent({
  components: { VaList },
  template: '<VaList/>',
})
