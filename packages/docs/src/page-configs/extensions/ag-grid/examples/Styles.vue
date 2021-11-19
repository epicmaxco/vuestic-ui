<template>
  <div>
    <va-checkbox v-model="isStriped" label="Striped" />
    <va-checkbox v-model="isHoverable" label="Hoverable" />
    <div style="height: 300px; width: 100%;">
      <ag-grid-vue
        class="ag-theme-vuestic"
        :class="{ 'ag-theme-vuestic--striped': isStriped, 'ag-theme-vuestic--hoverable': isHoverable }"
        style="width: 100%; height: 100%;"
        :columnDefs="columnDefs"
        :rowData="rowData"
        :modules="modules"
      />
    </div>
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
      isStriped: true,
      isHoverable: true,
      rowData: null,
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
@import "../../../../../../../node_modules/@vuestic/ag-grid-theme/index";
</style>
