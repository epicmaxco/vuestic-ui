<template>
  <va-data-table
    :fields="fields"
    :data="users"
    :loading="loading"
    :total-pages="totalPages"
    api-mode
    @pageSelected="readPage"
    :currentPage="currentPage"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import users from '../../../data/Users'
import VaDataTable from './VaDataTable.vue'

@Component({
  components: { VaDataTable },
})
export default class VaDataTableApiModeExample extends Vue {
  loading = false
  perPage = 4
  currentPage = 1
  users: Array<any> = []
  fields: Array<any> = [{
    name: 'firstName',
    label: 'First Name',
    width: '30%',
  }, {
    name: 'lastName',
    label: 'Last Name',
    width: '30%',
  }, {
    name: 'country',
    label: 'Country',
  }]

  get totalPages (): number {
    return Math.floor(users.length / this.perPage)
  }

  readPage (page = 1): void {
    const sliceFrom: number = (page - 1) * this.perPage

    this.loading = true

    setTimeout(() => {
      this.users = users.slice(sliceFrom, sliceFrom + this.perPage)
      this.loading = false
      this.currentPage = page
    }, 450)
  }

  created () {
    this.readPage()
  }
}
</script>
