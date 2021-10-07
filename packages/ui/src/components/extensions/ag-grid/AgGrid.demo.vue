<template>
  <VbDemo>
    <VbCard title="Simple table">
      <ag-grid-vue
        class="ag-theme-vuestic"
        style="width: 800px;"
        domLayout="autoHeight"
        :columnDefs="simpleColumnDefs"
        :rowData="rowData"
        rowSelection="multiple"
      />
    </VbCard>
    <VbCard title="Simple table">
      <ag-grid-vue
        class="ag-theme-vuestic ag-theme-vuestic--hoverable"
        style="width: 800px;"
        domLayout="autoHeight"
        :columnDefs="simpleColumnDefs"
        :rowData="rowData"
        rowSelection="multiple"
      />
    </VbCard>
    <VbCard title="Simple striped table">
      <ag-grid-vue
        class="ag-theme-vuestic ag-theme-vuestic--striped"
        style="width: 800px;"
        domLayout="autoHeight"
        :columnDefs="simpleColumnDefs"
        :rowData="rowData"
        rowSelection="multiple"
      />
    </VbCard>
    <VbCard title="Simple table">
      <ag-grid-vue
        class="ag-theme-alpine"
        style="width: 800px;"
        domLayout="autoHeight"
        :columnDefs="simpleColumnDefs"
        :rowData="rowData"
        rowSelection="multiple"
      />
    </VbCard>

    <VbCard title="Filter & Sorting">
      <ag-grid-vue
        class="ag-theme-alpine"
        style="width: 500px;"
        domLayout="autoHeight"
        :columnDefs="sortingColumnDefs"
        :rowData="rowData"
      />
    </VbCard>

    <VbCard title="Selection">
      <ag-grid-vue
        class="ag-theme-alpine"
        style="width: 500px;"
        domLayout="autoHeight"
        :columnDefs="selectionColumnDefs"
        :rowData="rowData"
        rowSelection="multiple"
      />
    </VbCard>
  </VbDemo>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue3'
import AgGridBadge from './AgGridBadge'

export default {
  /* eslint-disable vue/no-unused-components */
  components: { AgGridVue, AgGridBadge },
  data () {
    return {
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
      simpleColumnDefs: [
        { headerName: 'Name', field: 'fullName', sortable: true, filter: true, checkboxSelection: true },
        { field: 'email' },
        { field: 'country' },
        { field: 'status', cellRendererFramework: 'AgGridBadge' },
      ],
      sortingColumnDefs: [
        { field: 'fullName', sortable: true, filter: true },
        { field: 'email', sortable: true, filter: true },
        { field: 'country', sortable: true, filter: true },
        { field: 'status', sortable: true, filter: true },
      ],
      selectionColumnDefs: [
        { field: 'fullName', sortable: true, filter: true, checkboxSelection: true },
        { field: 'email', sortable: true, filter: true },
        { field: 'country', sortable: true, filter: true },
        { field: 'status', sortable: true, filter: true },
      ],
    }
  },
}
</script>

<style lang="scss">
@import "../../../../../../node_modules/ag-grid-community/dist/styles/ag-grid.css";
@import "../../../styles/ag-theme-vuestic/ag-theme-vuestic";
@import "~ag-grid-community/dist/styles/ag-theme-alpine.css";
</style>
