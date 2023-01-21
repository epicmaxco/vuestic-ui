<template>
  <div class="row mb-6">
    <va-checkbox
      class="flex flex-col md3 sm4 xs6"
      label="Row bind"
      v-model="isRowBind"
    />

    <va-checkbox
      class="flex flex-col md3 sm4 xs6"
      label="Cell bind"
      v-model="isCellBind"
    />
  </div>

  <va-data-table
    :items="items"
    :columns="columns"
    selectable
    :row-bind="isRowBind && getRowBind"
    :cell-bind="isCellBind && getCellBind"
  />
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
      { key: 'phone', sortable: true },
    ]

    return {
      items: users,
      columns,
      isCellBind: true,
      isRowBind: true,
    }
  },

  methods: {
    getRowBind (row) {
      const classes = ['customRowClass_1']
      if (row.name === 'Ervin Howell') {
        classes.push(['customRowClass_2', 'customRowClass_3'])
      } else if (row.phone.startsWith('(')) {
        classes.push({ customRowClass_4: true })
      }
      return { class: classes }
    },
    getCellBind (cell, row, column) {
      if (column.key === 'username' && cell.startsWith('S')) {
        return {
          style: { fontWeight: 'bold' },
          onClick: () => console.log(cell),
        }
      }
    },
  },
})
</script>

<style lang="scss">
.customRowClass_1 {
  color: darkblue;
}

.customRowClass_2 {
  background-color: rgb(205, 242, 174);
}

.customRowClass_3 {
  color: rgb(244, 10, 10);
}

.customRowClass_4 {
  background-color: rgb(213, 187, 241);
}
</style>
