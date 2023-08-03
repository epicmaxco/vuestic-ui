import { defineComponent } from 'vue'
import VaOptionList from './VaOptionList.demo.vue'

export default {
  title: 'VaOptionList',
  component: VaOptionList,
}

export const Default = defineComponent({
  components: { VaOptionList },
  template: '<VaOptionList/>',
})
