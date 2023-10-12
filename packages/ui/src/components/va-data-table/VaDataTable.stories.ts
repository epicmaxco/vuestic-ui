import { DataTableColumns, DataTableItems, defineVaDataTableColumns, defineVaDataTableItems } from './fabrics'
import { defineComponent } from 'vue'
import VaDataTableDemo from './VaDataTable.demo.vue'
import { VaDataTable } from '..'
import { VaPagination } from '../va-pagination'

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
  { name: 'Ccc', email: '' },
  { name: 'Ddd', email: '', test: '' },
  { name: 'Eee', email: '' },
  { name: 'Fff', email: '', test: '' },
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

export const PaginationAnimation = () => ({
  components: { VaDataTable, VaPagination },
  data: () => ({ columns, items, currentPage: 1, pages: 3 }),

  template: `
  <VaDataTable :items="items" :columns="columns"     :per-page="2"
  :current-page="currentPage">
    <template #bodyAppend>
      <tr>
        <td colspan="6">
          <div class="flex justify-center mt-4">
            <va-pagination
              v-model="currentPage"
              :pages="pages"
            />
          </div>
        </td>
      </tr>
    </template>
  </VaDataTable>
  `,
})
