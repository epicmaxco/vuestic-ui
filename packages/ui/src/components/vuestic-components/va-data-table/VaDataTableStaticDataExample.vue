<template>
  <div>
    <va-data-table
      :fields="fields"
      :data="filteredUsers"
      :per-page="perPage"
      :currentPage="currentPage"
      @pageSelected="currentPage = $event"
    >
      <template #header>
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

      <template
        slot="select"
        slot-scope="props"
      >
        <va-checkbox
          :value="props.rowData.checked"
          @input="select(props.rowData)"
        />
      </template>

      <template
        slot="actions"
        slot-scope="props"
      >
        <va-button
          size="small"
          @click="show(props.rowData)"
        >
          View User JSON
        </va-button>
      </template>
    </va-data-table>
    Selected: {{ selected }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import users from '../../../data/Users'
import VaDataTable from './VaDataTable.vue'
import VaCheckbox from '../va-checkbox/VaCheckbox.vue'
import VaButton from '../va-button/VaButton.vue'

@Component({
  components: {
    VaDataTable,
    VaCheckbox,
    VaButton,
  },
})
export default class VaDataTableStaticDataExample extends Vue {
  term = ''
  perPage = 4
  currentPage = 1
  perPageOptions: Array<number> = [4, 6, 10]
  users: Array<any> = users.slice()
  fields: Array<any> = [{
    name: '__slot:select',
    width: '30px',
  }, {
    name: 'firstName',
    label: 'First Name',
    sortField: 'firstName',
    width: '30%',
  }, {
    name: 'lastName',
    label: 'Last Name',
    sortField: 'lastName',
    width: '30%',
  }, {
    name: '__slot:actions',
    dataClass: 'text-right',
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

  select (user: any): void {
    const idx = this.users.findIndex(u => u.id === user.id)
    this.users[idx].checked = !this.users[idx].checked
  }

  show (user: any): void {
    window.alert(JSON.stringify(user))
  }
}
</script>
