<template>
  <va-data-table :items="items" :columns="columns" class="table-example--crud">
    <template #headerAppend>
      <tr class="table-example--slot">
        <th colspan="1"><va-input placeholder="name" v-model="nameModel" /></th>
        <th colspan="1"><va-input placeholder="username" v-model="usernameModel" /></th>
        <th colspan="1"><va-input placeholder="email" v-model="emailModel" /></th>
        <th colspan="1"><va-button @click="addNewItem()" :disabled="!isNewData">Add new</va-button></th>
      </tr>
    </template>

    <template #cell(actions)="{ rowIndex }">
      <va-button flat icon="edit" @click="openEditItemById(rowIndex)" />
      <va-button flat icon="delete" @click="deleteById(rowIndex)" />
    </template>
  </va-data-table>

  <va-modal
    v-model="showModal"
    message="Edit item"
    @ok="editItem()"
  >
    <slot>
      <va-input class="my-3" label="name" v-model="nameEditModel" />
      <va-input class="my-3" label="username" v-model="usernameEditModel" />
      <va-input class="my-3" label="email" v-model="emailEditModel" />
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

      nameModel: '',
      usernameModel: '',
      emailModel: '',
      nameEditModel: '',
      usernameEditModel: '',
      emailEditModel: '',
      editItemId: null,

      showModal: false,
    }
  },
  computed: {
    isNewData () {
      return !!(this.nameModel && this.usernameModel && this.emailModel)
    },
  },
  methods: {
    deleteById (id) {
      this.items = [...this.items.slice(0, id), ...this.items.slice(id + 1)]
    },
    resetInputs () {
      this.nameModel = ''
      this.usernameModel = ''
      this.emailModel = ''
    },
    resetEditData () {
      this.editItemId = null
      this.nameEditModel = ''
      this.usernameEditModel = ''
      this.emailEditModel = ''
    },
    makeNewItem () {
      return {
        name: this.nameModel,
        username: this.usernameModel,
        email: this.emailModel,
      }
    },
    updateItem () {
      return {
        name: this.nameEditModel,
        username: this.usernameEditModel,
        email: this.emailEditModel,
      }
    },
    addNewItem () {
      this.items = [...this.items, this.makeNewItem()]
      this.resetInputs()
    },
    editItem () {
      this.items = [
        ...this.items.slice(0, this.editItemId),
        this.updateItem(),
        ...this.items.slice(this.editItemId + 1),
      ]
      this.resetEditData()
    },
    openEditItemById (id) {
      this.editItemId = id
      const item = this.items[id]

      this.nameEditModel = item.name
      this.usernameEditModel = item.username
      this.emailEditModel = item.email

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
