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
import { defineComponent, ref } from 'vue'

export default defineComponent({
  data () {
    const useAdditionalClass = ref(false)
    const useAdditionalStyle = ref(false)

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
        alignHead: 'left',
        verticalAlignHead: 'top',
        align: 'left',
        verticalAlign: 'top',
        sortable: true,
      },
      {
        key: 'text',
        label: 'Text',
        alignHead: 'center',
        verticalAlignHead: 'middle',
        align: 'center',
        verticalAlign: 'middle',
        sortable: true,
      },
      {
        key: 'target',
        label: 'Target',
        alignHead: 'right',
        verticalAlignHead: 'bottom',
        align: 'right',
        verticalAlign: 'bottom',
        sortable: true,
      },
    ]

    const verticalAlignOptions = ['top', 'middle', 'bottom']
    const alignOptions = ['left', 'center', 'right']
    const widthOptions = ['25%', '200px', 300]
    const additionalStyle = {
      color: 'blue',
      fontWeight: 900,
    }

    return {
      items,
      columns,
      verticalAlignOptions,
      alignOptions,
      widthOptions,
      useAdditionalClass,
      useAdditionalStyle,
      additionalStyle,
    }
  },

  watch: {
    useAdditionalClass (value) {
      this.columns[0].classes = value ? 'additional-class' : ''
    },
    useAdditionalStyle (value) {
      this.columns[1].style = value ? this.additionalStyle : {}
    },
  },
})
</script>

<style lang="scss">
.table-example {
  th {
    background-color: #f0f0f0;
    height: 60px;
  }

  tr {
    border-bottom: 1px solid #f0f0f0;

    td {
      height: 80px;
      border-right: 1px solid #f0f0f0;
    }
  }
}

.additional-class {
  color: orange;
  font-style: italic;
  font-weight: 900;
}
</style>
