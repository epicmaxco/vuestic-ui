<template>
  <div>
    <va-data-table
      ref="datatable"
      :fields="fields"
      :data="filteredUsers"
      :per-page="perPage"
      :data-manager="dataManager"
    />
  </div>
</template>

<script>
import users from '../../../data/users.json'
import VaDataTable from './VaDataTable'

export default {
  components: { VaDataTable },
  data () {
    return {
      term: '',
      perPage: 4,
      perPageOptions: [4, 6, 10],
      users: users.slice(),
      fields: [{
        name: 'firstName',
        label: 'First Name',
        sortField: 'firstName',
        width: '30%',
      }, {
        name: 'lastName',
        label: 'Last Name',
        sortField: 'lastName',
        width: '30%',
      }],
    }
  },
  computed: {
    selected () {
      return this.users.filter(user => user.checked)
    },
    filteredUsers () {
      if (!this.term || this.term.length < 1) {
        return this.users
      }

      return this.users.filter(user => {
        return user.firstName.toLowerCase().startsWith(this.term.toLowerCase())
      })
    },
  },
  methods: {
    sortAsc (items, field) {
      return items.slice().sort((a, b) => {
        return a[field].split('').reverse().join('').localeCompare(b[field].split('').reverse().join(''))
      })
    },
    sortDesc (items, field) {
      return items.slice().sort((a, b) => {
        return b[field].split('').reverse().join('').localeCompare(a[field].split('').reverse().join(''))
      })
    },
    dataManager (sortOrder, pagination) {
      let sorted = []

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

      pagination = this.$refs.datatable.buildPagination(sorted.length, this.perPage)
      const { from } = pagination
      const sliceFrom = from - 1

      return {
        pagination,
        data: sorted.slice(sliceFrom, sliceFrom + this.perPage),
      }
    },
  },
}
</script>

<style lang="scss">
</style>
