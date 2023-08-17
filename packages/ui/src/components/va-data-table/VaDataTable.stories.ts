import { defineComponent } from 'vue'
import VaDataTable from './VaDataTable.demo.vue'

export default {
  title: 'VaDataTable',
  component: VaDataTable,
}

export const Default = defineComponent({
  components: { VaDataTable },
  template: '<VaDataTable/>',
})
