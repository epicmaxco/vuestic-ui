<template>
  <VbDemo>
    <VbCard title="Default Data Table">
      <va-data-table :items="itemList" :headers="headers" />
    </VbCard>
    <VbCard title="Small list">
      <va-data-table :items="itemSmallList" :headers="headers" />
    </VbCard>
    <VbCard title="loading is true">
      <va-data-table :items="itemList" :headers="headers" loading />
    </VbCard>
    <VbCard title="with caption slot">
      <va-data-table :items="itemList" :headers="headers">
        <template #caption>Caption Example</template>
      </va-data-table>
    </VbCard>
    <VbCard title="footer settings">
      <va-data-table :items="itemList" :headers="headers">
        <va-data-table-footer
          :items-per-page-label="customRowsPerPageLabel"
          :disabled-items-per-page="customDisabledItemsPerPage"
          :disabled-pagination="customDisabledPagination"
          :items-per-page-options="customOptions"
        />
      </va-data-table>
      <hr>
      <va-input
        label="rows-per-page-label"
        v-model="customRowsPerPageLabel"
      />
      <va-checkbox
        v-model="customDisabledPagination"
        label="Disabled Pagination"
      />
      <va-checkbox
        v-model="customDisabledItemsPerPage"
        label="Disabled ItemsPerPage"
      />
    </VbCard>
    <VbCard title="with footer: -pagination and -items-per-page slots">
      <va-data-table :items="itemList" :headers="headers">
        <template #footer:pagination>Slot pagination</template>
        <template #footer:items-per-page>Slot items-per-page</template>
      </va-data-table>
    </VbCard>
    <VbCard title="without footer">
      <va-data-table :items="itemList" :headers="headers" :items-per-page="20">
        <va-data-table-footer
          hide-items-per-page
        />
      </va-data-table>
    </VbCard>
    <VbCard title="without header">
      <va-data-table :items="itemList" :headers="headers" hide-default-header />
    </VbCard>
    <VbCard title="with cell slot">
      <va-data-table :items="itemList" :headers="headers">
        <template #header:cell="{ options }">(Slot {{ options.label }})</template>
      </va-data-table>
    </VbCard>
    <VbCard title="with cell_{name} slot">
      <va-data-table :items="itemList" :headers="headers">
        <template #header:cell_name="{ options }">(Slot {{ options.label }})</template>
      </va-data-table>
    </VbCard>
  </VbDemo>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import VaDataTable, { VaDataTableFooter, DataTableHeader } from './index'

function generateExampleList (length: number, headers: Array<DataTableHeader>) {
  return Array.from(Array(length)).map((value, index) => {
    const iterable = headers.map(header => [header.key, header.key + index])
    return Object.fromEntries(iterable)
  })
}

export default defineComponent({
  name: 'VaDataTable.Demo',
  components: {
    VaDataTable,
    VaDataTableFooter,
  },
  setup () {
    const headers: DataTableHeader[] = [
      new DataTableHeader('id', 'Id'),
      {
        key: 'name',
        label: 'Name',
        sortable: false,
      },
      new DataTableHeader('description', 'Description'),
    ]
    const itemList = generateExampleList(11, headers)
    const itemSmallList = generateExampleList(5, headers)
    const customRowsPerPageLabel = ref('New label')
    const customDisabledPagination = ref(false)
    const customDisabledItemsPerPage = ref(false)
    const customOptions = ref([5, 7, 20, 34, 0].map(item => ({ text: item || 'All', value: item })))
    return {
      headers,
      itemList,
      itemSmallList,
      customRowsPerPageLabel,
      customDisabledPagination,
      customDisabledItemsPerPage,
      customOptions,
    }
  },
})
</script>
