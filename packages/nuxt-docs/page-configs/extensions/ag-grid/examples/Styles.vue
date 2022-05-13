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

<script setup lang="ts">
import { AgGridVue } from '@ag-grid-community/vue3'
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model'

const ssr = false

const modules = [ClientSideRowModelModule]

const isStriped = true
const isHoverable = true

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
