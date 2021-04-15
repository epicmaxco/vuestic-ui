<template>
  <div>
    <va-data-table
      ref="datatable"
      :fields="fields"
      :data="filteredUsers"
      :per-page="perPage"
      :data-manager="dataManager"
      :currentPage="currentPage"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import users from '../../../data/Users'
import VaDataTable from './VaDataTable.vue'
const transformToString = (a: any) => {
  a = a ?? ''
  if (typeof a === 'string') { return a }
  return a.toString()
}

@Component({
  components: { VaDataTable },
})
export default class VaDataTableCustomDataManagerExample extends Vue {
  term = ''
  perPage = 4
  currentPage = 1
  perPageOptions: Array<number> = [4, 6, 10]
  users: Array<any> = users.slice()
  fields: Array<any> = [{
    name: 'firstName',
    label: 'First Name',
    sortField: 'firstName',
    width: '30%',
  }, {
    name: 'lastName',
    label: 'Last Name',
    sortField: 'lastName',
    width: '30%',
  }]

  get selected (): Array<any> {
    return this.users.filter(user => user.checked)
  }

  get filteredUsers (): Array<any> {
    if (!this.term || this.term.length < 1) {
      return this.users
    }

    return this.users.filter(user => {
      return user.firstName.toLowerCase().startsWith(this.term.toLowerCase())
    })
  }

  get noPagination (): boolean {
    return (this.$refs.datatable as Vue & { noPagination: boolean }).noPagination
  }

  sortAsc (items: Array<any>, field: any): Array<any> {
    return items.slice().sort((a: any, b: any) => {
      const first: string = transformToString(a[field])
      const second: string = transformToString(b[field])
      return first.split('').reverse().join('').localeCompare(second.split('').reverse().join(''))
    })
  }

  sortDesc (items: Array<any>, field: any): Array<any> {
    return items.slice().sort((a: any, b: any) => {
      const first: string = transformToString(a[field])
      const second: string = transformToString(b[field])
      return second.split('').reverse().join('').localeCompare(first.split('').reverse().join(''))
    })
  }

  dataManager (sortOrder: any, pagination: any) {
    let sorted: Array<any> = []

    if (!sortOrder.length) {
      sorted = this.filteredUsers
    } else {
      const { sortField, direction } = sortOrder[0]
      sorted = direction === 'asc' ? this.sortAsc(this.filteredUsers, sortField) : this.sortDesc(this.filteredUsers, sortField)
    }

    if (this.noPagination) {
      return {
        data: sorted,
      }
    }

    pagination = (this.$refs.datatable as Vue & { buildPagination: (length: number, perPage: number) => void }).buildPagination(sorted.length, this.perPage)
    const { from } = pagination
    const sliceFrom = from - 1
    this.currentPage = pagination.current_page

    return {
      pagination,
      data: sorted.slice(sliceFrom, sliceFrom + this.perPage),
    }
  }
}
</script>
