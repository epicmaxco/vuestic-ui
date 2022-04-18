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

<script setup lang="ts">
import { AgGridVue } from '@ag-grid-community/vue3'
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model'

const modules = [ClientSideRowModelModule]

const columnDefs = [
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
]

const rowData = ref(null)

onBeforeMount(() => {
  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(result => result.json())
    .then(data => { rowData.value = data })
})
</script>

<style lang="scss">
@import "@vuestic/ag-grid-theme/index";
</style>
