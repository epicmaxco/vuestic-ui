<template>
  <va-data-table
    :items="items"
    :columns="columns"
    :selectable="true"
    :row-class="getCustomRowClass"
    :row-style="getCustomRowStyle"
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
    }
  },

  methods: {
    getCustomRowClass (item) {
      const classes = ['customRowClass_1']
      if (item.name === 'Ervin Howell') {
        classes.push(['customRowClass_2', 'customRowClass_3'])
      } else if (item.phone.startsWith('(')) {
        classes.push({ customRowClass_4: true })
      }
      return classes
    },
    getCustomRowStyle (item, index) {
      if (index === 0) {
        return 'font-weight: bold'
      } else if (item.id === 3) {
        return { fontStyle: 'italic', 'text-shadow': '1px 1px yellow' }
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
