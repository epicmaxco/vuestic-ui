<template>
  <div class="h-[300px] w-full">
    <ag-grid-vue
      class="ag-theme-vuestic w-full h-full"
      :defaultColDef="defaultColDef"
      :columnDefs="columnDefs"
      :rowData="rowData"
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
      defaultColDef: {
        editable: true,
      },
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
      .then(rowData => { this.rowData = rowData })
  },
}
</script>

<style lang="scss">
@import '@vuestic/ag-grid-theme';
</style>
