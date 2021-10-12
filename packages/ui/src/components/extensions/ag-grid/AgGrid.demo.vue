<template>
  <VbDemo>
    <VbCard title="Alpine table">
      <div :style="exampleWrapperStyle">
        <ag-grid-vue
          class="ag-theme-alpine"
          style="width: 100%; height: 100%;"
          :columnDefs="simpleColumnDefs"
          :rowData="rowData"
          rowSelection="multiple"
        />
      </div>
    </VbCard>

    <VbCard title="Simple table">
      <div :style="exampleWrapperStyle">
        <ag-grid-vue
          class="ag-theme-vuestic"
          style="width: 100%; height: 100%;"
          :columnDefs="simpleColumnDefs"
          :rowData="rowData"
          rowSelection="multiple"
        />
      </div>
    </VbCard>

    <VbCard title="Simple striped table">
      <div :style="exampleWrapperStyle">
        <ag-grid-vue
          class="ag-theme-vuestic ag-theme-vuestic--striped"
          style="width: 100%; height: 100%;"
          :columnDefs="simpleColumnDefs"
          :rowData="rowData"
          rowSelection="multiple"
        />
      </div>
    </VbCard>

    <VbCard title="Row drag">
      <div :style="exampleWrapperStyle">
        <ag-grid-vue
          class="ag-theme-vuestic"
          style="width: 100%; height: 100%;"
          :columnDefs="rowDragColumnDefs"
          :rowData="rowData"
          :rowDragManaged="true"
        />
      </div>
    </VbCard>

    <VbCard title="Filter & Sorting">
      <div :style="exampleWrapperStyle">
        <ag-grid-vue
          class="ag-theme-vuestic"
          style="width: 100%; height: 100%;"
          :columnDefs="sortingColumnDefs"
          :rowData="rowData"
        />
      </div>
    </VbCard>

    <VbCard title="Selection">
      <div :style="exampleWrapperStyle">
        <ag-grid-vue
          class="ag-theme-vuestic"
          style="width: 100%; height: 100%;"
          :columnDefs="selectionColumnDefs"
          :rowData="rowData"
          rowSelection="multiple"
        />
      </div>
    </VbCard>

    <VbCard title="Column group">
      <div :style="exampleWrapperStyle">
        <ag-grid-vue
          class="ag-theme-vuestic"
          style="width: 100%; height: 100%;"
          :columnDefs="groupColumnDefs"
          :rowData="rowData"
        />
      </div>
      <a href="https://www.ag-grid.com/vue-data-grid/column-groups/#example-basic-grouping" target="_blank">Covered source</a>
    </VbCard>

    <VbCard title="Pinned rows">
      <div :style="exampleWrapperStyle">
        <ag-grid-vue
          class="ag-theme-vuestic"
          style="width: 100%; height: 100%;"
          :columnDefs="simpleColumnDefs"
          :rowData="rowData"
          :pinnedTopRowData="pinnedTopRowData"
          :pinnedBottomRowData="pinnedBottomRowData"
        />
      </div>
      <a href="https://www.ag-grid.com/vue-data-grid/row-pinning/#example-row-pinning" target="_blank">Covered source</a>
    </VbCard>

    <VbCard title="Cell editing">
      <div :style="exampleWrapperStyle">
        <ag-grid-vue
          class="ag-theme-vuestic"
          style="width: 100%; height: 100%;"
          :columnDefs="editableColumnDefs"
          :rowData="rowData"
        />
      </div>
      <a href="https://www.ag-grid.com/vue-data-grid/cell-editing/#example-cell-editing" target="_blank">Covered source</a>
    </VbCard>

    <VbCard title="No data">
      <div :style="exampleWrapperStyle">
        <ag-grid-vue
          class="ag-theme-vuestic"
          style="width: 100%; height: 100%;"
          :columnDefs="simpleColumnDefs"
          :rowData="[]"
        />
      </div>
    </VbCard>

    <VbCard title="Loading">
      <div :style="exampleWrapperStyle">
        <ag-grid-vue
          class="ag-theme-vuestic"
          style="width: 100%; height: 100%;"
          :columnDefs="simpleColumnDefs"
          :rowData="null"
        />
      </div>
    </VbCard>
  </VbDemo>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue3'
import AgGridBadge from './AgGridBadge'
import olympicWinnersData from './data'

export default {
  /* eslint-disable vue/no-unused-components */
  components: { AgGridVue, AgGridBadge },
  data () {
    return {
      gridApi: null,
      rowData: null,
      pinnedTopRowData: null,
      pinnedBottomRowData: null,
      simpleColumnDefs: [
        { field: 'athlete', sortable: true },
        { field: 'age', width: 90 },
        { field: 'country' },
        { field: 'year', width: 90, unSortIcon: true },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ],
      rowDragColumnDefs: [
        { field: 'athlete', rowDrag: true },
        { field: 'age', width: 90 },
        { field: 'country' },
        { field: 'year', width: 90, unSortIcon: true },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ],
      sortingColumnDefs: [
        { field: 'athlete', sortable: true, filter: true },
        { field: 'age', sortable: true, filter: true, width: 90 },
        { field: 'country', sortable: true, filter: true },
        { field: 'year', sortable: true, filter: true, width: 90, unSortIcon: true },
        { field: 'date', sortable: true, filter: true },
        { field: 'sport', sortable: true, filter: true },
        { field: 'gold', sortable: true, filter: true },
        { field: 'silver', sortable: true, filter: true },
        { field: 'bronze', sortable: true, filter: true },
        { field: 'total', sortable: true, filter: true },
      ],
      selectionColumnDefs: [
        { field: 'athlete', rowDrag: true },
        { field: 'age', width: 90 },
        { field: 'country' },
        { field: 'year', width: 90, unSortIcon: true },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
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
      editableColumnDefs: [
        { field: 'athlete', editable: true },
        { field: 'age', width: 90, editable: true },
        { field: 'country', editable: true },
        { field: 'year', width: 90, unSortIcon: true, editable: true },
        { field: 'date', editable: true },
        { field: 'sport', editable: true },
        { field: 'gold', editable: true },
        { field: 'silver', editable: true },
        { field: 'bronze', editable: true },
        { field: 'total', editable: true },
      ],
    }
  },
  beforeMount () {
    setTimeout(() => {
      this.rowData = olympicWinnersData
      this.pinnedTopRowData = [olympicWinnersData[0]]
      this.pinnedBottomRowData = [olympicWinnersData[3], olympicWinnersData[4]]
    }, 1000)
  },
  computed: {
    exampleWrapperStyle () {
      return {
        width: '800px',
        height: '300px',
      }
    },
  },
}
</script>

<style lang="scss">
@import "../../../../../../node_modules/ag-grid-community/dist/styles/ag-grid.css";
@import "../../../styles/ag-theme-vuestic/ag-theme-vuestic";
@import "~ag-grid-community/dist/styles/ag-theme-alpine.css";
</style>
