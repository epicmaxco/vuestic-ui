import { defineVaDataTableColumns, defineVaDataTableItems } from './fabrics'
import { defineComponent } from 'vue'
import VaDataTableDemo from './VaDataTable.demo.vue'
import { VaDataTable } from '..'

export default {
  title: 'VaDataTable',
  component: VaDataTableDemo,
}

const columns = defineVaDataTableColumns([
  { key: 'name' },
  { key: 'email' },
])

const items = defineVaDataTableItems<typeof columns>([
  { name: 'Aaa', email: '' },
  { name: 'Bbb', email: '' },
])

export const Default = defineComponent({
  components: { VaDataTable: VaDataTableDemo },
  template: '<VaDataTable/>',
})

export const NoData = () => ({
  components: { VaDataTable },
  data: () => ({ columns }),
  template: '<VaDataTable :columns="columns" />',
})

export const FilteredNoData = () => ({
  components: { VaDataTable },
  data: () => ({ columns, items }),
  template: '<VaDataTable filter="Ccc" :items="items" :columns="columns" />',
})
