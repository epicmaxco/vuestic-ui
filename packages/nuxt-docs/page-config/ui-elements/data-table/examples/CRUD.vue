<template>
  <va-data-table
    class="table-crud-example"
    :items="items"
    :columns="columns"
    striped
  >
    <template #headerAppend>
      <tr class="table-crud-example__slot">
        <th
          v-for="key in Object.keys(createdItem)"
          :key="key"
          class="p-1"
        >
          <va-input
            :placeholder="key"
            v-model="createdItem[key]"
          />
        </th>
        <th class="p-1">
          <va-button
            @click="addNewItem"
            :disabled="!isNewData"
            block
          >
            Add
          </va-button>
        </th>
      </tr>
    </template>

    <template #cell(actions)="{ rowIndex }">
      <va-button preset="plain" icon="edit" @click="openModalToEditItemById(rowIndex)" />
      <va-button preset="plain" icon="delete" @click="deleteItemById(rowIndex)" />
    </template>
  </va-data-table>

  <va-modal
    class="modal-crud-example"
    :model-value="!!editedItem"
    title="Edit item"
    size="small"
    @ok="editItem"
    @cancel="resetEditedItem"
  >
    <va-input
      v-for="key in Object.keys(editedItem)"
      :key="key"
      class="my-3"
      :label="key"
      v-model="editedItem[key]"
    />
  </va-modal>
</template>

<script>
import { defineComponent } from 'vue'

const defaultItem = {
  name: '',
  username: '',
  email: '',
}

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
      { key: 'actions', width: 80 },
    ]

    return {
      items,
      columns,
      editedItemId: null,
      editedItem: null,
      createdItem: { ...defaultItem },
    }
  },

  computed: {
    isNewData () {
      return Object.keys(this.createdItem).every((key) => !!this.createdItem[key])
    },
  },

  methods: {
    resetEditedItem () {
      this.editedItem = null
      this.editedItemId = null
    },
    resetCreatedItem () {
      this.createdItem = { ...defaultItem }
    },
    deleteItemById (id) {
      this.items = [
        ...this.items.slice(0, id),
        ...this.items.slice(id + 1),
      ]
    },
    addNewItem () {
      this.items = [...this.items, { ...this.createdItem }]
      this.resetCreatedItem()
    },
    editItem () {
      this.items = [
        ...this.items.slice(0, this.editedItemId),
        { ...this.editedItem },
        ...this.items.slice(this.editedItemId + 1),
      ]
      this.resetEditedItem()
    },
    openModalToEditItemById (id) {
      this.editedItemId = id
      this.editedItem = { ...this.items[id] }
    },
  },
})
</script>

<style lang="scss" scoped>
.table-crud-example {
  --va-form-element-default-width: 0;

  .va-input {
    display: block;
  }

  &__slot {
    th {
      vertical-align: middle;
    }
  }
}

.modal-crud-example {
  .va-input {
    display: block;
  }
}
</style>
