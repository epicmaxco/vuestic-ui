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
      />
    </div>
  </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue3'
import data from 'vuestic-ui/src/components/extensions/ag-grid/data'

export default {
  components: { AgGridVue },
  data () {
    return {
      isStriped: true,
      isHoverable: true,
      rowData: data,
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
}
</script>

<style lang="scss">
@import "~ag-grid-community/dist/styles/ag-grid.css";
@import "~vuestic-ui/src/styles/ag-theme-vuestic/ag-theme-vuestic";
</style>
