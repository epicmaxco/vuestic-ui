<template>
  <div class="row">
    <div class="flex lg4 mb-2">
      <va-switch
        class="mt-2"
        label="Striped style"
        size="small"
        v-model="isTableStriped"
      />
      <br />
      <va-switch
        class="mt-2"
        label="Animated rows"
        size="small"
        v-model="animated"
      />
      <br />
      <va-switch
        class="mt-2"
        label="Clickable rows"
        size="small"
        v-model="isTableRowsClickable"
      />
    </div>

    <div class="flex lg4 mb-2">
      <va-switch
        class="mt-2"
        label="Loading state"
        size="small"
        v-model="isTableLoading"
      />
      <br />
      <va-switch
        class="mt-2"
        label="Add (prepend) slots"
        size="small"
        v-model="prependSlot"
      />
      <br />
      <va-switch
        class="mt-2"
        label="Add (append) slots"
        size="small"
        v-model="appendSlot"
      />
    </div>

    <div class="flex lg4 mb-2">
      <va-switch
        class="mt-2"
        label="Hide default header"
        size="small"
        v-model="hideDefaultHeader"
      />
      <br />
      <va-switch
        class="mt-2"
        label="Clone header to footer"
        size="small"
        v-model="footerClone"
        :disabled="hideDefaultHeader"
      />
      <br />
      <va-switch
        class="mt-2"
        label="Allow foot sorting"
        size="small"
        v-model="footerSorting"
        :disabled="hideDefaultHeader || !footerClone"
      />
    </div>
  </div>

  <va-data-table
    :items="items"
    :columns="columns"
    :striped="isTableStriped"
    :selectable="true"
    :clickable="isTableRowsClickable"
    :loading="isTableLoading"
    :hide-default-header="hideDefaultHeader"
    :footer-clone="footerClone"
    :allow-footer-sorting="footerSorting"
    :animated="animated"
    @row:click="rowEventType = $event.event.type, rowId = $event.item.id"
    @row:dblclick="rowEventType = $event.event.type, rowId = $event.item.id"
    @row:contextmenu="rowEventType = $event.event.type, rowId = $event.item.id"
  >
    <template #headerPrepend v-if="prependSlot">
      <tr><th colspan="8">Custom cell which span 8 cells (headPrepend slot)</th></tr>
    </template>
    <template #headerAppend v-if="appendSlot">
      <tr><th colspan="8">Custom cell which span 8 cells (headAppend slot)</th></tr>
    </template>

    <template #bodyPrepend v-if="prependSlot">
      <tr><td colspan="8">Custom cell which span 8 cells (bodyPrepend slot)</td></tr>
    </template>
    <template #bodyAppend v-if="appendSlot">
      <tr><td colspan="8">Custom cell which span 8 cells (bodyAppend slot)</td></tr>
    </template>

    <template #footerPrepend v-if="prependSlot">
      <tr><th colspan="8">Custom cell which span 8 cells (footPrepend slot)</th></tr>
    </template>
    <template #footerAppend v-if="appendSlot">
      <tr><th colspan="8">Custom cell which span 8 cells (footAppend slot)</th></tr>
    </template>
  </va-data-table>

  <va-alert v-if="isTableRowsClickable" class="mt-3" border="left">
    <span>
      Last row click event (id, event type):
      <va-chip v-if="rowId">{{ rowId }}</va-chip>
      <va-chip v-if="rowEventType">{{ rowEventType }}</va-chip>
    </span>
  </va-alert>

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
      isTableLoading: false,
      isTableStriped: true,
      isTableRowsClickable: false,
      hideDefaultHeader: false,
      footerClone: true,
      footerSorting: true,
      prependSlot: false,
      appendSlot: false,
      animated: true,
      rowEventType: '',
      rowId: '',
    }
  },

  watch: {
    isTableRowsClickable (value) {
      if (!value) {
        this.rowEventType = ''
        this.rowId = ''
      }
    },
  },
})
</script>
