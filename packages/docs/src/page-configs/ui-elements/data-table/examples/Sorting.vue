<template>
  <div class="row">
    <va-select
      class="flex mb-2 md6"
      v-model="sortBy"
      label="Sort by"
      :options="sortByOptions()"
    />

    <va-select
      class="flex mb-2 md6"
      v-model="sortingOrder"
      label="Sorting order"
      :options="sortingOrderOptions"
      :value-by="(option) => option.value"
    />
  </div>

  <va-data-table
    :items="items"
    :columns="columns"
    :hoverable="true"
    v-model:sort-by="sortBy"
    v-model:sorting-order="sortingOrder"
    @sorted="
      sortedRowsEmitted = $event.items.map(row => row.id),
      sortingOrderEmitted = $event.sortingOrder,
      sortByEmitted = $event.sortBy
    "
  />

  <va-alert class="mt-3" border="left">
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

<script>
import { defineComponent } from 'vue'
import shuffle from 'lodash/shuffle'

export default defineComponent({
  data () {
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

    return {
      items: shuffle(users),
      columns,
      sortBy: 'username',
      sortingOrder: 'asc',
      sortingOrderOptions,
      sortByEmitted: '',
      sortingOrderEmitted: '',
      sortedRowsEmitted: [],
    }
  },

  methods: {
    sortByOptions () {
      return this.columns.map(({ key }) => key)
    },
  },
})
</script>
