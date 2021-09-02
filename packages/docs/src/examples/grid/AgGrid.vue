<template>
  <ag-grid-vue
    style="height: 300px;"
    class="ag-theme-vuestic"
    :columnDefs="columnDefs"
    :rowData="rowData"
  />
</template>

<script>
import { AgGridVue } from 'ag-grid-vue3'

/* const BadgeComponent = { */
/*   template: '<va-badge :text="user.status" :color="user.status" />' */
/* } */

export default {
  data () {
    return {
      columnDefs: null,
      rowData: null,
    }
  },
  components: {
    AgGridVue,
    /* BadgeComponent */
  },
  beforeMount () {
    this.rowData = [
      {
        id: '5d2c865e9a0bae79a6ef7cfa',
        firstName: 'Ashley',
        lastName: 'Mcdaniel',
        fullName: 'Ashley Mcdaniel',
        email: 'ashleymcdaniel@nebulean.com',
        country: 'Cayman Islands',
        starred: true,
        hasReport: false,
        status: 'warning',
        checked: false,
        trend: 'down',
        color: 'warning',
        graph: 'M 5 20 C 10 5, 15 5, 30 30 S 20 20, 70 20',
        graphColor: '#4ae387',
      },
      {
        id: '5d2c865ec73341e16e5f2251',
        firstName: 'Sellers',
        lastName: 'Todd',
        fullName: 'Todd Sellers',
        email: 'sellerstodd@nebulean.com',
        country: 'Togo',
        starred: false,
        hasReport: false,
        status: 'info',
        checked: false,
        trend: 'none',
        color: 'primary',
        graph: 'M 5 30 C 10 5, 30 10, 40 30 S 30 30, 90 40',
        graphColor: '#e34a4a',
      },
      {
        id: '5d2c865e38800c5ce28f2f6b',
        firstName: 'Sherman',
        lastName: 'Knowles',
        fullName: 'Sherman Knowles',
        email: 'shermanknowles@nebulean.com',
        country: 'Central African Republic',
        starred: true,
        hasReport: true,
        status: 'warning',
        checked: false,
        trend: 'none',
        color: 'warning',
        graph: 'M 5 20 C 10 5, 15 5, 30 30 S 20 20, 70 20',
        graphColor: '#4ae387',
      },
      {
        id: '5d2c865e957cd150b82e17a6',
        firstName: 'Vasquez',
        lastName: 'Lawson',
        fullName: 'Vasquez Lawson',
        email: 'vasquezlawson@nebulean.com',
        country: 'Bouvet Island',
        starred: true,
        hasReport: false,
        status: 'info',
        checked: false,
        trend: 'down',
        color: 'warning',
        graph: 'M 5 30 C 10 5, 30 10, 40 30 S 30 30, 90 40',
        graphColor: '#e34a4a',
      },
      {
        id: '5d2c865e9194dbe2faf99227',
        firstName: 'April',
        lastName: 'Sykes',
        fullName: 'April Sykes',
        email: 'aprilsykes@nebulean.com',
        country: 'Saint Vincent and The Grenadines',
        starred: false,
        hasReport: true,
        status: 'warning',
        checked: false,
        trend: 'down',
        color: 'primary',
        graph: 'M 5 20 C 10 5, 15 5, 30 30 S 20 20, 70 20',
        graphColor: '#4ae387',
      },
    ]

    this.columnDefs = [
      { headerName: 'Name', field: 'fullName' },
      { field: 'email' },
      { field: 'country' },
      {
        field: 'status',
        cellRenderer: params => {
          return '<va-badge text="warning" color="warning">' + params.value + '</va-badge>'
        },
      },
    ]
  },
}
</script>

<style lang="scss">
@import "ag-grid-community/dist/styles/ag-grid.css";
</style>
