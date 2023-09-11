import { defineComponent } from 'vue'
import VaDataTableNew from './VaDataTable.new.demo.vue'

export default {
  title: 'VaDataTableNew',
  component: VaDataTableNew,
}

export const Default = defineComponent({
  components: { VaDataTableNew },
  template: '<VaDataTableNew/>',
})
