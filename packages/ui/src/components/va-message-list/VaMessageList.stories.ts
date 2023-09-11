import { defineComponent } from 'vue'
import VaMessageList from './VaMessageList.demo.vue'

export default {
  title: 'VaMessageList',
  component: VaMessageList,
}

export const Default = defineComponent({
  components: { VaMessageList },
  template: '<VaMessageList />',
})
