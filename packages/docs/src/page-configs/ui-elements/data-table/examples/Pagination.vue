<template>
  <div class="row">
    <va-input
      class="flex mb-2 md3"
      type="number"
      placeholder="Items..."
      label="Items per page"
      v-model.number="perPage"
    />

    <va-input
      class="flex mb-2 md3"
      type="number"
      placeholder="Page..."
      label="Current page"
      v-model.number="currentPage"
    />

    <va-input
      class="flex mb-2 md3"
      placeholder="Filter..."
      v-model="filter"
    />
  </div>

  <va-data-table
    :items="items"
    :columns="columns"
    :per-page="perPage"
    :current-page="currentPage"
    :selectable="true"
    :filter="filter"
    @filtered="filtered = $event.items"
  >
    <template #bodyAppend>
      <tr><td colspan="8" class="table-example--pagination">
        <va-pagination
          v-model="currentPage"
          input
          :pages="pages"
        />
      </td></tr>
    </template>
  </va-data-table>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    const users = [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
      },
      {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        phone: '010-692-6593 x09125',
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
        phone: '493-170-9623 x156',
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
      { key: 'id', sortable: true, width: '60px' },
      { key: 'username', sortable: true, width: '120px' },
      { key: 'name', sortable: true, width: '170px' },
      { key: 'email', sortable: true, width: '250px' },
      { key: 'phone' },
    ]

    return {
      items: users,
      columns,
      perPage: 3,
      currentPage: 1,
      filter: '',
      filtered: users,
    }
  },

  computed: {
    pages () {
      return (this.perPage && this.perPage !== 0)
        ? Math.ceil(this.filtered.length / this.perPage)
        : this.filtered.length
    },
  },
})
</script>

<style lang="scss" scoped>
  .table-example--pagination {
    text-align: center;
    text-align: -webkit-center;
  }
</style>
