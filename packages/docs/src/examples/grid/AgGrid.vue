<template>
  <ag-grid-vue
    class="ag-theme-vuestic"
    domLayout="autoHeight"
    :columnDefs="columnDefs"
    :rowData="rowData"
    :rowHeight="46"
    :headerHeight="38"
  />
</template>

<script>
import { AgGridVue } from 'ag-grid-vue3'
import AgGridBadge from './AgGridBadge'

export default {
  /* eslint-disable vue/no-unused-components */
  components: { AgGridVue, AgGridBadge },
  data () {
    return {
      columnDefs: [
        { headerName: 'Name', field: 'fullName' },
        { field: 'email' },
        { field: 'country' },
        { field: 'status', cellRendererFramework: 'AgGridBadge' },
      ],
      rowData: [
        {
          fullName: 'Ashley Mcdaniel',
          email: 'ashleymcdaniel@nebulean.com',
          country: 'Cayman Islands',
          status: 'warning',
        },
        {
          fullName: 'Todd Sellers',
          email: 'sellerstodd@nebulean.com',
          country: 'Togo',
          status: 'info',
        },
        {
          fullName: 'Sherman Knowles',
          email: 'shermanknowles@nebulean.com',
          country: 'Central African Republic',
          status: 'warning',
        },
        {
          fullName: 'Vasquez Lawson',
          email: 'vasquezlawson@nebulean.com',
          country: 'Bouvet Island',
          status: 'info',
        },
        {
          fullName: 'April Sykes',
          email: 'aprilsykes@nebulean.com',
          country: 'Saint Vincent and The Grenadines',
          status: 'warning',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
@import "ag-grid-community/dist/styles/ag-grid.css";
</style>
