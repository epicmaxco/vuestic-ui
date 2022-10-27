<template>
  <div class='row mb-4'>
    <div class='flex md4'>
      <va-select
        v-model="columns[0].thAlign"
        label="First heading align"
        :options="alignOptions"
      />
      <va-select
        class="mt-2"
        v-model="columns[0].thVerticalAlign"
        label="First heading vertical align"
        :options="verticalAlignOptions"
      />
      <va-select
        class="mt-2"
        v-model="columns[0].width"
        label="First heading width"
        :options="widthOptions"
        clearable
      />
    </div>
    <div class='flex md4'>
      <va-select
        v-model="columns[1].thAlign"
        label="Second heading align"
        :options="alignOptions"
      />
      <va-select
        class="mt-2"
        v-model="columns[1].thVerticalAlign"
        label="Second heading vertical align"
        :options="verticalAlignOptions"
      />
      <va-select
        class="mt-2"
        v-model="columns[1].width"
        label="Second heading width"
        :options="widthOptions"
        clearable
      />
    </div>
    <div class='flex md4'>
      <va-select
        v-model="columns[2].thAlign"
        label="Third heading align"
        :options="alignOptions"
      />
      <va-select
        class="mt-2"
        v-model="columns[2].thVerticalAlign"
        label="Third heading vertical align"
        :options="verticalAlignOptions"
      />
      <va-select
        class="mt-2"
        v-model="columns[2].width"
        label="Third heading width"
        :options="widthOptions"
        clearable
      />
    </div>
  </div>

  <div class='row mb-4'>
    <div class='flex md4'>
      <va-select
        v-model="columns[0].tdAlign"
        label="First column align"
        :options="alignOptions"
        color="#990099"
      />
      <va-select
        class="mt-2"
        v-model="columns[0].tdVerticalAlign"
        label="First column vertical align"
        :options="verticalAlignOptions"
        color="#990099"
      />
    </div>
    <div class='flex md4'>
      <va-select
        v-model="columns[1].tdAlign"
        label="Second column align"
        :options="alignOptions"
        color="#990099"
      />
      <va-select
        class="mt-2"
        v-model="columns[1].tdVerticalAlign"
        label="Second column vertical align"
        :options="verticalAlignOptions"
        color="#990099"
      />
    </div>
    <div class='flex md4'>
      <va-select
        v-model="columns[2].tdAlign"
        label="Third column align"
        :options="alignOptions"
        color="#990099"
      />
      <va-select
        class="mt-2"
        v-model="columns[2].tdVerticalAlign"
        label="Third column vertical align"
        :options="verticalAlignOptions"
        color="#990099"
      />
    </div>
  </div>

  <div class='row mb-4'>
    <va-checkbox
      class="flex mb-1 md6"
      label="Use additional class to cells of first column"
      v-model="useAdditionalClass"
    />
    <va-checkbox
      class="flex mb-1 md6"
      label="Use additional styles to cells of second column"
      v-model="useAdditionalStyle"
    />
  </div>

  <va-data-table
    class="table-example"
    :items='items'
    :columns='columns'
  />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    const items = [
      {
        id: 1,
        text: 'Some text 1',
        target: 'Some prop 1',
      },
      {
        id: 2,
        text: 'Some text 2',
        target: 'Some prop 2',
      },
      {
        id: 3,
        text: 'Some text 3',
        target: 'Some prop 3',
      },
    ]

    const columns = [
      {
        key: 'id',
        label: 'ID',
        thAlign: 'left',
        thVerticalAlign: 'top',
        tdAlign: 'left',
        tdVerticalAlign: 'top',
        sortable: true,
      },
      {
        key: 'text',
        label: 'Text',
        thAlign: 'center',
        thVerticalAlign: 'middle',
        tdAlign: 'center',
        tdVerticalAlign: 'middle',
        sortable: true,
      },
      {
        key: 'target',
        label: 'Target',
        thAlign: 'right',
        thVerticalAlign: 'bottom',
        tdAlign: 'right',
        tdVerticalAlign: 'bottom',
        sortable: true,
      },
    ]

    const verticalAlignOptions = ['top', 'middle', 'bottom']
    const alignOptions = ['left', 'center', 'right']
    const widthOptions = ['25%', '200px', 300]

    return {
      items,
      columns,
      verticalAlignOptions,
      alignOptions,
      widthOptions,
      useAdditionalClass: true,
      useAdditionalStyle: true,
    }
  },

  watch: {
    useAdditionalClass: {
      handler (value) {
        this.columns[0].tdClass = value && 'additionalClass'
      },
      immediate: true,
    },
    useAdditionalStyle: {
      handler (value) {
        this.columns[1].tdStyle = value && { color: 'blue', fontWeight: 900 }
      },
      immediate: true,
    },
  },
})
</script>

<style lang="scss">
  .table-example {
    th {
      background-color: var(--va-background-element);
      border: 1px solid currentColor;
      height: 50px;
    }

    tr {
      border-bottom: 1px solid currentColor;

      td {
        height: 70px;
      }
    }
  }

  .additionalClass {
    color: orange;
    font-style: italic;
    font-weight: 900;
  }
</style>
