import { DataTableColumns, DataTableItems, defineVaDataTableColumns, defineVaDataTableItems } from './fabrics'
import { defineComponent, ref, watch } from 'vue'
import VaDataTableDemo from './VaDataTable.demo.vue'
import { VaDataTable } from '..'
import { VaPagination } from '../va-pagination'
import { StoryFn } from '@storybook/vue3'
import { defineStory } from '../../../.storybook/types'

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
  { name: 'Aaa', email: 'aaa@com.com' },
  { name: 'Bbb', email: 'bbb@com.com', test: '' },
  { name: 'Ccc', email: 'ccc@com.com' },
  { name: 'Ddd', email: 'ddd@com.com', test: '' },
  { name: 'Eee', email: 'eee@com.com' },
  { name: 'Fff', email: 'fff@com.com', test: '' },
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

export const Sort = () => ({
  components: { VaDataTable },
  data: () => ({
    columns: defineVaDataTableColumns([
      { key: 'id', sortable: true },
      { key: 'name', sortable: true },
      { key: 'email', sortable: true },
    ]),
    items: items.map((item, index) => ({ ...item, id: index * 3 })),
    sortBy: 'name',
    sortingOrder: 'asc',
  }),
  template: `
    <p>[sortBy]: {{ sortBy }}</p>
    <p>[sortingOrder]: {{ sortingOrder }}</p>
    <VaDataTable
      v-model:sort-by="sortBy"
      v-model:sorting-order="sortingOrder"
      :items="items" :columns="columns"
    />
  `,
})

export const ColumnSortedEvent = () => ({
  components: { VaDataTable },
  data: () => ({
    columns: defineVaDataTableColumns([
      { key: 'name', sortable: true },
      { key: 'email', sortable: true },
    ]) satisfies Columns,
    items,
    e: null,
    sortBy: 'name',
    sortingOrder: 'asc',
  }),
  template: `
    <p>[sortBy]: {{ sortBy }}</p>
    <p>[sortingOrder]: {{ sortingOrder }}</p>
    <p>[emitted]: {{ e }}</p>
    <VaDataTable
      v-model:sort-by="sortBy"
      v-model:sorting-order="sortingOrder"
      :items="items" :columns="columns" @columnSorted="e = $event"
    />
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

// Expect no sorting animation when clicking on the table header
export const disableClientSideSorting: StoryFn = () => ({
  components: { VaDataTable },
  setup () {
    const sortBy = ref('name')
    const sortingOrder = ref('asc')
    const loading = ref(false)

    const sortedItems = ref(items)

    watch([sortBy, sortingOrder], () => {
      loading.value = true
      setTimeout(() => {
        sortedItems.value = [...items].sort((a, b) => {
          const sortingOrderRatio = sortingOrder.value === 'desc' ? -1 : 1

          return sortingOrderRatio * (a[sortBy.value] > b[sortBy.value] ? 1 : -1)
        })
        loading.value = false
      }, 1000)
    }, { immediate: true })

    const columns = defineVaDataTableColumns([
      { key: 'name', sortable: true },
      { key: 'email', sortable: true },
    ]) satisfies Columns

    return {
      loading,
      columns,
      sortedItems,
      sortBy,
      sortingOrder,
    }
  },
  template: '<VaDataTable v-model:sort-by="sortBy" :loading="loading" v-model:sorting-order="sortingOrder" :items="sortedItems" :columns="columns" disable-client-side-sorting />',
})

export const Striped = () => ({
  components: { VaDataTable, VaPagination },
  data: () => ({ columns, items }),

  template: `
  <VaDataTable :items="items" :columns="columns" striped />
  `,
})

export const ExpandableRow = () => ({
  components: { VaDataTable, VaPagination },
  data: () => ({ columns: [...columns, { key: 'actions', width: 80 }], items }),

  template: `
  <VaDataTable :items="items" :columns="columns" striped>
     <template #cell(actions)="{ row, isExpanded }">
      <button
        @click="row.toggleRowDetails()"
      >
        {{ isExpanded ? 'Hide': 'More info' }}
      </button>
    </template>

    <template #expandableRow="{ rowData }">
      {{ rowData }}
    </template>
  </VaDataTable>
  `,
})

export const NoDataText = () => ({
  components: { VaDataTable, VaPagination },
  data: () => ({ columns, items }),

  template: `
    <VaDataTable :items="[]" :columns="columns" no-data-html="Test no data" />
  `,
})

export const NoDataTextSlot = () => ({
  components: { VaDataTable, VaPagination },
  data: () => ({ columns, items }),

  template: `
    <VaDataTable :items="[]" :columns="columns">
      <template #no-data>
        <div class="text-center">No data Test</div>
      </template>
    </VaDataTable>
  `,
})

export const NoFilteredDataText = () => ({
  components: { VaDataTable, VaPagination },
  data: () => ({ columns, items }),

  template: `
    <VaDataTable :items="[{ name: 'BbB' }]" :columns="columns" filter="Aaa" no-data-filtered-html="Test no filtered data" />
  `,
})

export const ExpandableRowFilter = () => ({
  components: { VaDataTable, VaPagination },
  data () {
    const items = [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        phone: '1-770-736-8031',
        website: 'hildegard.org',
      },
      {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        phone: '010-692-6593',
        website: 'anastasia.net',
      },
      {
        id: 3,
        name: 'Clementine Bauch',
        username: 'Samantha',
        email: 'Nathan@yesenia.net',
        phone: '1-463-123-4447',
        website: 'ramiro.info',
      },
      {
        id: 4,
        name: 'Patricia Lebsack',
        username: 'Karianne',
        email: 'Julianne.OConner@kory.org',
        phone: '493-170-9623',
        website: 'kale.biz',
      },
      {
        id: 5,
        name: 'Chelsey Dietrich',
        username: 'Kamren',
        email: 'Lucio_Hettinger@annie.ca',
        phone: '(254)954-1289',
        website: 'demarco.info',
      },
    ]

    const columns = [
      { key: 'name' },
      { key: 'username' },
      { key: 'email' },
      { key: 'actions', width: 80 },
    ]
    const filter = ref('')

    return {
      items,
      columns,
      filter,
    }
  },

  template: `
    <input v-model="filter"/>
    <VaDataTable
      :items="items"
      :columns="columns"
      :filter="filter"
    >
      <template #cell(actions)="{ row, isExpanded }">
          <button
            @click="row.toggleRowDetails()"
          >
            {{ isExpanded ? 'Hide': 'More info' }}
          </button>
      </template>

      <template #expandableRow="{ rowData }" >
        <div>
          {{ rowData }}
        </div>
      </template>
    </VaDataTable>
  `,
})

export const RowSlot = defineStory({
  story: () => ({
    components: { VaDataTable },
    setup () {
      const items = [
        { name: 'Aaa', email: 'a', age: 12 },
        { name: 'Bbb', email: 'b', age: 12 },
        { name: 'Ccc', email: 'c', age: 12 },
        { name: 'Ddd', email: 'd', age: 12 },
        { name: 'Eee', email: 'e', age: 12 },
      ]

      const columns = defineVaDataTableColumns([
        { key: 'name' },
        { key: 'email' },
        { key: 'age' },
      ]) satisfies Columns

      return {
        items,
        columns,
      }
    },
    template: `
      <VaDataTable :items="items" :columns="columns">
        <template #row="{ rowData }">
          <tr>
            <td>{{ rowData.name }}</td>
            <td>{{ rowData.email }}</td>
            <td>{{ rowData.age }}</td>
          </tr>
        </template>
      </VaDataTable>
    `,
  }),
})
