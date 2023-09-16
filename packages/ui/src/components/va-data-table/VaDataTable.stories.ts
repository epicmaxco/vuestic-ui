import { DataTableColumns, DataTableItems, defineVaDataTableColumns, defineVaDataTableItems } from './fabrics'
import { defineComponent } from 'vue'
import VaDataTableDemo from './VaDataTable.demo.vue'
import { VaDataTable } from '..'

export default {
  title: 'VaDataTable',
  component: VaDataTableDemo,
}

type User = {
  name: string
  email: string,
  age: 12
}

type Columns = DataTableColumns<User>

const columns = defineVaDataTableColumns([
  { key: 'name' },
  { key: 'email' },
]) satisfies Columns

type Items = DataTableItems<typeof columns>

const items = defineVaDataTableItems<typeof columns>([
  { name: 'Aaa', email: '' },
  { name: 'Bbb', email: '', test: '' },
]) satisfies Items

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

export const FilteredEvent = () => ({
  components: { VaDataTable },
  data: () => ({ columns, items, filter: 'Aaa', e: null }),
  template: `
    emitted: {{ e }}
    <VaDataTable filter="Aaa" :items="items" :columns="columns" @filtered="e = $event" />
  `,
})
