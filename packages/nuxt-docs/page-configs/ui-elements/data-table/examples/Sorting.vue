<template>
  <div class="row">
    <va-select
      class="flex mb-2 md6"
      v-model="sortBy"
      label="Sort by"
      :options="sortByOptions"
    />

    <va-select
      class="flex mb-2 md6"
      v-model="sortingOrder"
      label="Sorting order"
      :options="sortingOrderOptions"
      :value-by="(option: { value: string }) => option.value"
    />
  </div>

  <va-data-table
    :items="items"
    :columns="columns"
    :hoverable="true"
    v-model:sort-by="sortBy"
    v-model:sorting-order="sortingOrder"
    @sorted="onSorted"
  />

  <va-alert
    class="mt-3"
    border="left"
  >
    <span v-if="sortingOrder">
      Sorted items order (showing id):
      <va-chip v-show="!!sortedRowsEmitted.length">{{ sortedRowsEmitted.join(' --> ') }}</va-chip>
      <va-chip v-show="!!sortingOrderEmitted">{{ sortingOrderEmitted }}</va-chip>
      <va-chip v-show="!!sortByEmitted">{{ sortByEmitted }}</va-chip>
    </span>
    <span v-else>
      Unsorted items order (showing id):
      <va-chip v-show="!!sortedRowsEmitted.length">{{ sortedRowsEmitted.join(', ') }}</va-chip>
    </span>
  </va-alert>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import shuffle from 'lodash/shuffle'
import { TSortedArgs } from 'vuestic-ui/src/components/va-data-table/hooks/useSortable'
import { ITableItem, TSortingOrder } from 'vuestic-ui/src/components/va-data-table/types'

const users = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    phone: '1-770-736-8031 x56442',
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    phone: '010-692-6593 x09125',
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'Nathan@yesenia.net',
    phone: '1-463-123-4447',
  },
  {
    id: 4,
    name: 'Patricia Lebsack',
    username: 'Karianne',
    email: 'Julianne.OConner@kory.org',
    phone: '493-170-9623 x156',
  },
  {
    id: 5,
    name: 'Chelsey Dietrich',
    username: 'Kamren',
    email: 'Lucio_Hettinger@annie.ca',
    phone: '(254)954-1289',
  },
]

const columns = [
  { key: 'id', sortable: true },
  { key: 'username', sortable: true },
  { key: 'name', sortable: true },
  { key: 'email', sortable: true },
  { key: 'phone' },
]

const sortingOrderOptions = [
  { text: 'asc', value: 'asc' },
  { text: 'desc', value: 'desc' },
  { text: 'no sorting', value: null },
]

export default defineComponent({
  setup () {
    const sortByOptions = computed(() => columns.map(({ key }) => key))

    const sortBy = ref('username')
    const sortingOrder = ref('asc')
    const sortedRowsEmitted = ref<ITableItem[]>([])
    const sortingOrderEmitted = ref<TSortingOrder>()
    const sortByEmitted = ref('')

    const onSorted = (e: TSortedArgs) => {
      sortedRowsEmitted.value = e.items.map(row => row.id)
      sortingOrderEmitted.value = e.sortingOrder
      sortByEmitted.value = e.sortBy
    }

    return {
      onSorted,
      sortByOptions,
      items: shuffle(users),
      columns,
      sortByEmitted,
      sortingOrderEmitted,
      sortedRowsEmitted,
      sortBy,
      sortingOrder,
      sortingOrderOptions,
    }
  },
})
</script>
