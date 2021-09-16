<template>
  <div>
    <div class="flex mb-5">
      <h6>Use custom slots</h6>
      <va-data-table :items="items">
        <template #head(address)>Street</template>
        <template #head(company)>Company Name</template>

        <template #cell(address)="{ source: address }">{{ address.street }}</template>
        <template #cell(company)="{ source: company }">{{ company.name }}</template>
      </va-data-table>
    </div>

    <div class="flex mb-5">
      <h6>Show head, body and foot's prepend and append static rows</h6>
      <va-data-table :items="items" foot-clone>
        <template #headPrepend>
          <tr class="table-example--slots slots-head">
            <th colspan="8">Custom cell which span 8 cells (headPrepend slot)</th>
          </tr>
        </template>
        <template #headAppend>
          <tr class="table-example--slots slots-head">
            <th colspan="1">#</th>
            <th colspan="3">User info</th>
            <th colspan="4">Contact info</th>
          </tr>
        </template>

        <template #bodyPrepend>
          <tr class="table-example--slots slots-body">
            <td colspan="4">Custom cell which span 4 cells (bodyPrepend slot)</td>
            <td colspan="4">Custom cell which span 4 cells (bodyPrepend slot)</td>
          </tr>
        </template>
        <template #bodyAppend>
          <tr class="table-example--slots slots-body">
            <td colspan="8">Custom cell which span 8 cells (bodyAppend slot)</td>
          </tr>
        </template>

        <template #footPrepend>
          <tr class="table-example--slots slots-foot">
            <th colspan="3">Span 3 cells</th>
            <th colspan="2">Span 2 cells</th>
            <th colspan="3">Span 3 cells</th>
          </tr>
        </template>
        <template #footAppend>
          <tr class="table-example--slots slots-foot">
            <th colspan="8">Span 8 cells (footAppend slot)</th>
          </tr>
        </template>
      </va-data-table>
    </div>

    <div class="flex mb-2">
      <h6>Use 'colgroup' slot to set specific className to last columns</h6>
      <va-data-table :items="items">
        <template #colgroup>
          <col span="7">
          <col class="table-example--slots">
        </template>
      </va-data-table>
    </div>
  </div>

</template>

<script>
import { defineComponent } from 'vue'
import VaDataTable from 'vuestic-ui/src/components/wip-va-data-table'

export default defineComponent({
  components: {
    VaDataTable,
  },

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

    return {
      items: users,
    }
  },
})
</script>

<style lang="scss" scoped>
.table-example--slots {
  background-color: #f0f0f0;
}

.table-example--slots.slots-head {
  background-color: #d1d1d1;
}

.table-example--slots.slots-body {
  background-color: #f1f1f1;
}

.table-example--slots.slots-foot {
  background-color: #e8e8e8;
}
</style>
