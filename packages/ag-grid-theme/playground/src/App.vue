<template>
  <div>
    <VaButton @click="toggleTheme">Toggle theme</VaButton>
  </div>
  <!-- The AG Grid component -->
  <ag-grid-vue
    :rowData="rowData"
    :columnDefs="colDefs"
    style="height: 500px"
    :default-col-def="defaultColDef"
    :pagination-auto-page-size="true"
    :pagination="true"
    :pinned-bottom-row-data="[rowData.at(-1)]"
    :rowSelection="{  mode: 'multiRow' }"
    class="ag-theme-vuestic"
  >
  </ag-grid-vue>
 </template>

<script>
import { ref } from 'vue';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "../../src/styles/index.scss"
// import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional: Theme
import { AgGridVue } from "ag-grid-vue3"; // Vue Data Grid Component
import { useColors, VaButton } from 'vuestic-ui'

export default {
  name: "App",
  components: {
    VaButton,
    AgGridVue, // Add Vue Data Grid component
  },
  setup() {
    const defaultColDef = {
      filter: true,
      floatingFilter: true,

      sortable: true,
    }

    // Row Data: The data to be displayed.
    const rowData = ref([]);

    // Column Definitions: Defines the columns to be displayed.
    const colDefs = ref([
      {
        headerName: 'Athlete (With Tooltip)',
        field: 'athlete',
        tooltipField: "country",
        headerTooltip: "Tooltip for Athlete Column Header",
      },
      { headerName: 'Age (Editable)', field: 'age', editable: true },
      { field: 'country' },
      { field: 'year' },
      { field: 'date' },
      { field: 'sport' },
      { field: 'gold' },
      { field: 'silver' },
      { field: 'bronze' },
      { field: 'total' },
    ]);

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then(response => response.json())
      .then(data => {
        rowData.value = data;
      });

    const { applyPreset, currentPresetName } = useColors()

    const toggleTheme = () => {
      applyPreset(currentPresetName.value === 'light' ? 'dark' : 'light')
    }

    return {
      defaultColDef,
      rowData,
      colDefs,
      toggleTheme,
    };
  },
};
</script>
