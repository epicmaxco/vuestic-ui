<template>
  <div class='row mb-4'>
    <div class='flex md4'>
      <va-select
        v-model="columns[0].alignHead"
        label="First heading align"
        :options="alignOptions"
      />
      <va-select
        class="mt-2"
        v-model="columns[0].verticalAlignHead"
        label="First heading vertical align"
        :options="verticalAlignOptions"
      />
    </div>
    <div class='flex md4'>
      <va-select
        v-model="columns[1].alignHead"
        label="Second heading align"
        :options="alignOptions"
      />
      <va-select
        class="mt-2"
        v-model="columns[1].verticalAlignHead"
        label="Second heading vertical align"
        :options="verticalAlignOptions"
      />
    </div>
    <div class='flex md4'>
      <va-select
        v-model="columns[2].alignHead"
        label="Third heading align"
        :options="alignOptions"
      />
      <va-select
        class="mt-2"
        v-model="columns[2].verticalAlignHead"
        label="Third heading vertical align"
        :options="verticalAlignOptions"
      />
    </div>
  </div>

  <div class='row mb-4'>
    <div class='flex md4'>
      <va-select
        v-model="columns[0].align"
        label="First column align"
        :options="alignOptions"
        color="#990099"
      />
      <va-select
        class="mt-2"
        v-model="columns[0].verticalAlign"
        label="First column vertical align"
        :options="verticalAlignOptions"
        color="#990099"
      />
    </div>
    <div class='flex md4'>
      <va-select
        v-model="columns[1].align"
        label="Second column align"
        :options="alignOptions"
        color="#990099"
      />
      <va-select
        class="mt-2"
        v-model="columns[1].verticalAlign"
        label="Second column vertical align"
        :options="verticalAlignOptions"
        color="#990099"
      />
    </div>
    <div class='flex md4'>
      <va-select
        v-model="columns[2].align"
        label="Third column align"
        :options="alignOptions"
        color="#990099"
      />
      <va-select
        class="mt-2"
        v-model="columns[2].verticalAlign"
        label="Third column vertical align"
        :options="verticalAlignOptions"
        color="#990099"
      />
    </div>
  </div>

  <va-data-table
    class="table-example--alignment"
    :items='items'
    :columns='columns'
  />
</template>

<script>
import { defineComponent } from 'vue'
import VaDataTable from 'vuestic-ui/src/components/va-data-table'

export default defineComponent({
  components: {
    VaDataTable,
  },

  data () {
    const items = [
      {
        id: 1,
        text: 'Somewhat long text (I need to expand it a bit so that the text gets wrapped (and thus occupies multiple lines) so that we can see how the other rows are vertically aligned). Somewhat long text (I need to expand it a bit so that the text gets wrapped (and thus occupies multiple lines) so that we can see how the other rows are vertically aligned). Somewhat long text (I need to expand it a bit so that the text gets wrapped (and thus occupies multiple lines) so that we can see how the other rows are vertically aligned)',
        target: 'Pretty short prop',
      },
      {
        id: 2,
        text: 'Somewhat long text (I need to expand it a bit so that the text gets wrapped (and thus occupies multiple lines) so that we can see how the other rows are vertically aligned). Somewhat long text (I need to expand it a bit so that the text gets wrapped (and thus occupies multiple lines) so that we can see how the other rows are vertically aligned). Somewhat long text (I need to expand it a bit so that the text gets wrapped (and thus occupies multiple lines) so that we can see how the other rows are vertically aligned)',
        target: 'Pretty short prop',
      },
      {
        id: 3,
        text: 'Somewhat long text (I need to expand it a bit so that the text gets wrapped (and thus occupies multiple lines) so that we can see how the other rows are vertically aligned). Somewhat long text (I need to expand it a bit so that the text gets wrapped (and thus occupies multiple lines) so that we can see how the other rows are vertically aligned). Somewhat long text (I need to expand it a bit so that the text gets wrapped (and thus occupies multiple lines) so that we can see how the other rows are vertically aligned)',
        target: 'Pretty short prop',
      },
    ]

    const columns = [
      {
        key: 'id',
        label: 'A Unique ID',
        alignHead: 'center',
        verticalAlignHead: 'middle',
        align: 'center',
        verticalAlign: 'middle',
        sortable: true,
      },
      {
        key: 'text',
        label: 'A long text',
        alignHead: 'center',
        verticalAlignHead: 'middle',
        align: 'center',
        verticalAlign: 'middle',
        sortable: true,
      },
      {
        key: 'target',
        label: 'Target field',
        alignHead: 'center',
        verticalAlignHead: 'middle',
        align: 'center',
        verticalAlign: 'middle',
        sortable: true,
      },
    ]

    const verticalAlignOptions = ['top', 'middle', 'bottom']
    const alignOptions = ['left', 'center', 'right']

    return {
      items,
      columns,
      verticalAlignOptions,
      alignOptions,
    }
  },
})
</script>

<style lang="scss">
.table-example--alignment th {
  background-color: #f0f0f0;
}
</style>
