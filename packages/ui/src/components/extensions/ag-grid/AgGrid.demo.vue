<template>
  <VbDemo>
    <VbCard title="Alpine table">
      <ag-grid-vue
        class="ag-theme-alpine"
        style="width: 800px;"
        domLayout="autoHeight"
        :columnDefs="simpleColumnDefs"
        :rowData="rowData"
        rowSelection="multiple"
      />
    </VbCard>
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
    <VbCard title="Row drag">
      <ag-grid-vue
        class="ag-theme-vuestic"
        style="width: 800px;"
        domLayout="autoHeight"
        :columnDefs="rowDragColumnDefs"
        :rowData="rowData"
        :rowDragManaged="true"
      />
    </VbCard>

    <VbCard title="Filter & Sorting">
      <ag-grid-vue
        class="ag-theme-vuestic"
        style="width: 800px;"
        domLayout="autoHeight"
        :columnDefs="sortingColumnDefs"
        :rowData="rowData"
      />
    </VbCard>

    <VbCard title="Selection">
      <ag-grid-vue
        class="ag-theme-vuestic"
        style="width: 800px;"
        domLayout="autoHeight"
        :columnDefs="selectionColumnDefs"
        :rowData="rowData"
        rowSelection="multiple"
      />
    </VbCard>
    <VbCard title="Column group">
      <ag-grid-vue
        class="ag-theme-vuestic"
        style="width: 800px;"
        domLayout="autoHeight"
        :columnDefs="groupColumnDefs"
        :rowData="rowData2"
      />
      <a href="https://www.ag-grid.com/vue-data-grid/column-groups/#example-basic-grouping" target="_blank">Covered source</a>
    </VbCard>
    <VbCard title="Pinned rows">
      <ag-grid-vue
        class="ag-theme-vuestic"
        style="width: 800px; height: 300px;"
        :columnDefs="simpleColumnDefs"
        :rowData="rowData"
        :pinnedTopRowData="pinnedTopRowData"
        :pinnedBottomRowData="pinnedBottomRowData"
      />
      <a href="https://www.ag-grid.com/vue-data-grid/row-pinning/#example-row-pinning" target="_blank">Covered source</a>
    </VbCard>
<!--    <VbCard title="Pinned rows">-->
<!--      <ag-grid-vue-->
<!--        style="width: 800px; height: 300px"-->
<!--        class="ag-theme-alpine"-->
<!--        :columnDefs="simpleColumnDefs"-->
<!--        :debug="true"-->
<!--        :rowData="rowData"-->
<!--        :pinnedTopRowData="pinnedTopRowData"-->
<!--        :pinnedBottomRowData="pinnedBottomRowData"-->
<!--      />-->
<!--    </VbCard>-->
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
      rowData2: [
        {
          athlete: 'Michael Phelps',
          age: 23,
          country: 'United States',
          year: 2008,
          date: '24/08/2008',
          sport: 'Swimming',
          gold: 8,
          silver: 0,
          bronze: 0,
          total: 8,
        },
        {
          athlete: 'Michael Phelps',
          age: 23,
          country: 'United States',
          year: 2008,
          date: '24/08/2008',
          sport: 'Swimming',
          gold: 8,
          silver: 0,
          bronze: 0,
          total: 8,
        },
        {
          athlete: 'Michael Phelps',
          age: 23,
          country: 'United States',
          year: 2008,
          date: '24/08/2008',
          sport: 'Swimming',
          gold: 8,
          silver: 0,
          bronze: 0,
          total: 8,
        },
        {
          athlete: 'Michael Phelps',
          age: 23,
          country: 'United States',
          year: 2008,
          date: '24/08/2008',
          sport: 'Swimming',
          gold: 8,
          silver: 0,
          bronze: 0,
          total: 8,
        },
      ],
      pinnedTopRowData: [
        {
          fullName: 'Ashley Mcdaniel',
          email: 'ashleymcdaniel@nebulean.com',
          country: 'Cayman Islands',
          status: 'warning',
        },
      ],
      pinnedBottomRowData: [
        {
          fullName: 'Ashley Mcdaniel',
          email: 'ashleymcdaniel@nebulean.com',
          country: 'Cayman Islands',
          status: 'warning',
        },
        {
          fullName: 'Ashley Mcdaniel',
          email: 'ashleymcdaniel@nebulean.com',
          country: 'Cayman Islands',
          status: 'warning',
        },
      ],
      simpleColumnDefs: [
        { headerName: 'Name', field: 'fullName', sortable: true, filter: true },
        { field: 'email' },
        { field: 'country' },
        { field: 'status', cellRendererFramework: 'AgGridBadge' },
      ],
      rowDragColumnDefs: [
        { headerName: 'Name', field: 'fullName', rowDrag: true },
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
      groupColumnDefs: [
        {
          headerName: 'Athlete Details',
          children: [
            {
              headerName: 'Athlete',
              field: 'athlete',
              width: 180,
              filter: 'agTextColumnFilter',
            },
            {
              headerName: 'Age',
              field: 'age',
              width: 90,
              filter: 'agNumberColumnFilter',
            },
            { headerName: 'Country', field: 'country', width: 140 },
          ],
        },
        {
          headerName: 'Sports Results',
          children: [
            { headerName: 'Sport', field: 'sport', width: 140 },
            {
              headerName: 'Total',
              columnGroupShow: 'closed',
              field: 'total',
              width: 100,
              filter: 'agNumberColumnFilter',
            },
            {
              headerName: 'Gold',
              columnGroupShow: 'open',
              field: 'gold',
              width: 100,
              filter: 'agNumberColumnFilter',
            },
            {
              headerName: 'Silver',
              columnGroupShow: 'open',
              field: 'silver',
              width: 100,
              filter: 'agNumberColumnFilter',
            },
            {
              headerName: 'Bronze',
              columnGroupShow: 'open',
              field: 'bronze',
              width: 100,
              filter: 'agNumberColumnFilter',
            },
          ],
        },
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
