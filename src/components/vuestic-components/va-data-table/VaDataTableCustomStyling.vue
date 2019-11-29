<template>
  <div>
    <va-data-table
      :fields="fields"
      :data="filteredUsers"
      default-header
      row-class="title-row"
    >
      <template slot="header">
        <input
          type="text"
          v-model="term"
          placeholder="Search"
          class="mr-2"
        >

        <select v-model.number="perPage">
          <option
            v-for="option in perPageOptions"
            :key="option"
          >
            {{ option }}
          </option>
        </select>
      </template>
    </va-data-table>
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
        width: '30%',
      }, {
        name: 'lastName',
        label: 'Last Name',
        width: '30%',
      },
      {
        name: 'country',
        label: 'Country',
        width: '30%',
      },
      {
        name: '__slot:actions',
        dataClass: 'text-right',
      }],
    }
  },
  computed: {
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
    select (user) {
      const idx = this.users.findIndex(u => u.id === user.id)
      this.users[idx].checked = !this.users[idx].checked
    },
    show (user) {
      window.alert(JSON.stringify(user))
    },
  },
}
</script>

<style lang="scss">
  @import "../../vuestic-sass/resources/resources";

  .title-row {
    color: black !important;

    @include va-title();

    td {
      padding: 0.625rem 0;
    }
  }
</style>
