<template>
  <va-data-table :items="items" :columns="columns" footer-clone>
    <template #headerPrepend>
      <tr class="table-example-slots__head">
        <th colspan="6">Custom cell which span all cells (headPrepend slot)</th>
      </tr>
    </template>
    <template #headerAppend>
      <tr class="table-example-slots__head">
        <th colspan="1">#</th>
        <th colspan="2">User info</th>
        <th colspan="3">Contact info</th>
      </tr>
    </template>

    <template #bodyPrepend>
      <tr class="table-example-slots__body">
        <td colspan="4">Custom cell which span 4 cells (bodyPrepend slot)</td>
        <td colspan="2">Custom cell which span 2 cells (bodyPrepend slot)</td>
      </tr>
    </template>
    <template #bodyAppend>
      <tr class="table-example-slots__body">
        <td colspan="6">Custom cell which span all cells (bodyAppend slot)</td>
      </tr>
    </template>

    <template #footerPrepend>
      <tr class="table-example-slots__foot">
        <th colspan="3">Span 3 cells</th>
        <th colspan="2">Span 2 cells</th>
        <th colspan="1">Span 1 cells</th>
      </tr>
    </template>
    <template #footerAppend>
      <tr class="table-example-slots__foot">
        <th colspan="6">Span all cells (footAppend slot)</th>
      </tr>
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
    ]

    const columns = [
      { key: 'id' },
      { key: 'name' },
      { key: 'username' },
      { key: 'email' },
      { key: 'phone' },
      { key: 'website' },
    ]

    return {
      items: users,
      columns,
    }
  },
})
</script>

<style lang="scss" scoped>
  .table-example-slots__head {
    background-color: var(--va-secondary);
  }

  .table-example-slots__body {
    background-color: var(--va-background-secondary);
  }

  .table-example-slots__foot {
    background-color: var(--va-background-element);
  }
</style>
