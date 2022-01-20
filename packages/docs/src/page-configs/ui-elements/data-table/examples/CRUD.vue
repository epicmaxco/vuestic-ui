<template>
  <va-data-table :items="items" :columns="columns" striped>
    <template #headerAppend>
      <tr class="table-example--slot">
        <th colspan="1"><va-input placeholder="name" v-model="addNameModel" /></th>
        <th colspan="1"><va-input placeholder="username" v-model="addUsernameModel" /></th>
        <th colspan="1"><va-input placeholder="email" v-model="addEmailModel" /></th>
        <th colspan="1"><va-button @click="addNewItem()" :disabled="!isNewData">Add new</va-button></th>
      </tr>
    </template>

    <template #cell(actions)="{ rowIndex }">
      <va-button flat icon="edit" @click="openModalToEditItemById(rowIndex)" />
      <va-button flat icon="delete" @click="deleteItemById(rowIndex)" />
    </template>
  </va-data-table>

  <va-modal
    v-model="showModal"
    message="Edit item"
    @ok="editItem()"
  >
    <slot>
      <va-input class="my-3" label="name" v-model="editNameModel" />
      <va-input class="my-3" label="username" v-model="editUsernameModel" />
      <va-input class="my-3" label="email" v-model="editEmailModel" />
    </slot>
  </va-modal>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    const items = [
      {
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
      },
      {
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
      },
      {
        name: 'Clementine Bauch',
        username: 'Samantha',
        email: 'Nathan@yesenia.net',
      },
      {
        name: 'Patricia Lebsack',
        username: 'Karianne',
        email: 'Julianne.OConner@kory.org',
      },
    ]

    const columns = [
      { key: 'name', sortable: true },
      { key: 'username', sortable: true },
      { key: 'email', sortable: true },
      { key: 'actions', width: 130 },
    ]

    return {
      items,
      columns,

      addNameModel: '',
      addUsernameModel: '',
      addEmailModel: '',
      editNameModel: '',
      editUsernameModel: '',
      editEmailModel: '',
      editItemId: null,

      showModal: false,
    }
  },

  computed: {
    isNewData () {
      return !!(this.addNameModel && this.addUsernameModel && this.addEmailModel)
    },
  },

  methods: {
    resetAddData () {
      this.addNameModel = ''
      this.addUsernameModel = ''
      this.addEmailModel = ''
    },
    resetEditData () {
      this.editItemId = null
      this.editNameModel = ''
      this.editUsernameModel = ''
      this.editEmailModel = ''
    },
    updateItem (isAddedNew = false) {
      return {
        name: isAddedNew ? this.addNameModel : this.editNameModel,
        username: isAddedNew ? this.addUsernameModel : this.editUsernameModel,
        email: isAddedNew ? this.addEmailModel : this.editEmailModel,
      }
    },
    deleteItemById (id) {
      this.items = [...this.items.slice(0, id), ...this.items.slice(id + 1)]
    },
    addNewItem () {
      this.items = [...this.items, this.updateItem(true)]
      this.resetAddData()
    },
    editItem () {
      this.items = [
        ...this.items.slice(0, this.editItemId),
        this.updateItem(),
        ...this.items.slice(this.editItemId + 1),
      ]
      this.resetEditData()
    },
    openModalToEditItemById (id) {
      this.editItemId = id
      const item = this.items[id]

      this.editNameModel = item.name
      this.editUsernameModel = item.username
      this.editEmailModel = item.email

      this.showModal = true
    },
  },
})
</script>

<style lang="scss" scoped>
.table-example--slot {
  th {
    padding-top: 5px;
    padding-bottom: 5px;
    vertical-align: middle;
  }
}
</style>
