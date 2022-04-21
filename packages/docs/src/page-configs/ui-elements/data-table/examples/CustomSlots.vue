<template>
  <va-data-table :items="items" :columns="columns">
    <template #header(address)>Street</template>
    <template #header(company)>Company Name</template>

    <template #cell(username)="{ rowData }"><va-chip>{{ rowData.username }}</va-chip></template>
    <template #cell(address)="{ rowData }">{{ rowData.address.street }}</template>
    <template #cell(company)="{ rowData }">{{ rowData.company.name }}</template>
  </va-data-table>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    const users = [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: {
            lat: '-37.3159',
            lng: '81.1496',
          },
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
          bs: 'harness real-time e-markets',
        },
      },
      {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        address: {
          street: 'Victor Plains',
          suite: 'Suite 879',
          city: 'Wisokyburgh',
          zipcode: '90566-7771',
          geo: {
            lat: '-43.9509',
            lng: '-34.4618',
          },
        },
        phone: '010-692-6593 x09125',
        website: 'anastasia.net',
        company: {
          name: 'Deckow-Crist',
          catchPhrase: 'Proactive didactic contingency',
          bs: 'synergize scalable supply-chains',
        },
      },
      {
        id: 3,
        name: 'Clementine Bauch',
        username: 'Samantha',
        email: 'Nathan@yesenia.net',
        address: {
          street: 'Douglas Extension',
          suite: 'Suite 847',
          city: 'McKenziehaven',
          zipcode: '59590-4157',
          geo: {
            lat: '-68.6102',
            lng: '-47.0653',
          },
        },
        phone: '1-463-123-4447',
        website: 'ramiro.info',
        company: {
          name: 'Romaguera-Jacobson',
          catchPhrase: 'Face to face bifurcated interface',
          bs: 'e-enable strategic applications',
        },
      },
    ]

    const columns = [
      { key: 'id' },
      { key: 'name' },
      { key: 'username' },
      { key: 'email' },
      { key: 'phone' },
      { key: 'website' },
      { key: 'address' },
      { key: 'company' },
    ]

    return {
      items: users,
      columns,
    }
  },
})
</script>
