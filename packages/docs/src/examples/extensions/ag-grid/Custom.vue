<template>
  <div style="height: 300px; width: 100%;">
    <ag-grid-vue
      class="ag-theme-vuestic"
      style="width: 100%; height: 100%;"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :modules="modules"
    />
  </div>
</template>

<script>
import { h } from 'vue'
import { AgGridVue } from '@ag-grid-community/vue3'
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model'
import VaBadge from 'vuestic-ui/src/components/va-badge/VaBadge'

const AgGridBadge = {
  components: {
    VaBadge,
  },
  render () {
    return h(VaBadge, { text: this.params.value })
  },
}

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { AgGridVue, AgGridBadge },
  data () {
    return {
      modules: [ClientSideRowModelModule],
      rowData: null,
      columnDefs: [
        { field: 'athlete' },
        { field: 'age' },
        { field: 'country' },
        { field: 'year' },
        { field: 'date' },
        { field: 'sport', cellRendererFramework: 'AgGridBadge' },
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
@import "~@vuestic/ag-grid-theme";
</style>
