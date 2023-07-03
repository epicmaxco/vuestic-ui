<template>
  <div class="h-[300px] w-full">
    <ag-grid-vue
      class="ag-theme-vuestic w-full h-full"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :pinnedTopRowData="pinnedTopRowData"
      :pinnedBottomRowData="pinnedBottomRowData"
      :modules="modules"
    />
  </div>
</template>

<script>
import { AgGridVue } from '@ag-grid-community/vue3'
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model'

export default {
  components: { AgGridVue },
  data () {
    return {
      modules: [ClientSideRowModelModule],
      rowData: null,
      pinnedTopRowData: null,
      pinnedBottomRowData: null,
      columnDefs: [
        { field: 'athlete' },
        { field: 'age' },
        { field: 'country' },
        { field: 'year' },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ],
    }
  },

  beforeMount () {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then(result => result.json())
      .then(rowData => {
        this.rowData = rowData
        this.pinnedTopRowData = [rowData[1]]
        this.pinnedBottomRowData = [rowData[3], rowData[4]]
      })
  },
}
</script>

<style lang="scss">
@import '@vuestic/ag-grid-theme';
</style>
