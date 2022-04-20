<template>
  <VbDemo>
    <VbCard title="Reactive data">
      <button @click="shuffleItems">Shuffle</button>
      <va-data-table
        :items="items"
        :clickable="true"
        @row:click="rowEventType = $event.event.type, rowId = $event.item.id"
        @row:dblclick="rowEventType = $event.event.type, rowId = $event.item.id"
        @row:contextmenu="rowEventType = $event.event.type, rowId = $event.item.id"
      >
        <template #header(address)>Street</template>
        <template #header(company)>Company Name</template>

        <template #cell(address)="{ rowData }">{{ rowData.address.street }}</template>
        <template #cell(company)="{ rowData }">{{ rowData.company.name }}</template>
      </va-data-table>

      <va-alert class="mt-3" border="left">
        <span>
          Last row click event (id, event type):
          <va-chip v-if="rowId">{{ rowId }}</va-chip>
          <va-chip v-if="rowEventType">{{ rowEventType }}</va-chip>
        </span>
      </va-alert>
    </VbCard>

    <VbCard title="Use custom slots for address and company">
      <va-data-table :items="items">
        <template #header(address)>Street</template>
        <template #header(company)>Company Name</template>

        <template #cell(address)="{ rowData }">{{ rowData.address.street }}</template>
        <template #cell(company)="{ rowData }">{{ rowData.company.name }}</template>
      </va-data-table>
    </VbCard>

    <VbCard title="Show footer and append static rows everywhere">
      <va-data-table :items="items" footer-clone>
        <template #header(address)>Street</template>
        <template #header(company)>Company Name</template>

        <template #cell(address)="{ rowData }">{{ rowData.address.street }}</template>
        <template #cell(company)="{ rowData }">{{ rowData.company.name }}</template>

        <template #headerAppend>
          <tr>
            <th colspan="4">User info</th>
            <th colspan="4">Contact info</th>
          </tr>
        </template>

        <template #bodyAppend>
          <tr>
            <td colspan="8">Custom cell which span 8 cells</td>
          </tr>
        </template>

        <template #footerAppend>
          <tr>
            <th colspan="8">Span 8 cells</th>
          </tr>
        </template>
      </va-data-table>
    </VbCard>

    <VbCard title="Use `colgroup` slot to set 2nd column's width to 50px">
      <va-data-table :items="items">
        <template #header(address)>Street</template>
        <template #header(company)>Company Name</template>

        <template #cell(address)="{ rowData }">{{ rowData.address.street }}</template>
        <template #cell(company)="{ rowData }">{{ rowData.company.name }}</template>

        <template #colgroup>
          <col>
          <col width="50">
        </template>
      </va-data-table>
    </VbCard>

    <VbCard title="Filtering">
      <p>Number of filtered items: {{ filteredCount }}</p>
      <input type="text" v-model="filter">

      <input id="useCustomFunction" type="checkbox" v-model="useCustomFilteringFn">
      <label for="useCustomFunction">Use custom filtering function (looks for an exact match)</label>

      <va-data-table
        :items="items"
        :filter="filter"
        :filter-method="customFilteringFn"
        @filtered="filteredCount = $event.length"
      >
        <template #header(address)>Street</template>
        <template #header(company)>Company Name</template>

        <template #cell(address)="{ rowData }">{{ rowData.address.street }}</template>
        <template #cell(company)="{ rowData }">{{ rowData.company.name }}</template>
      </va-data-table>
    </VbCard>

    <VbCard title="Use `columns` prop, enable sorting and use custom sorting function (always returns -1) for the `id` column">
      <label for="sortingBy">Sort by</label>
      <select id="sortingBy" v-model="sortBy">
        <option
          v-for="column in columns"
          :key="column.key"
          :value="column.key"
        >
          {{ column.key }}
        </option>
      </select><br>

      <label for="sortingOrder">Sorting order</label>
      <select id="sortingOrder" v-model="sortingOrder">
        <option value="asc">asc</option>
        <option value="desc">desc</option>
        <option :value="null">null</option>
      </select>

      <va-data-table
        :items="items"
        :columns="columns"
        v-model:sort-by="sortBy"
        v-model:sorting-order="sortingOrder"
      >
        <template #header(address)>Street</template>
        <template #header(company)>Company Name</template>

        <template #cell(address)="{ rowData }">{{ rowData.address.street }}</template>
        <template #cell(company)="{ rowData }">{{ rowData.company.name }}</template>
      </va-data-table>
    </VbCard>

    <VbCard title="Selection (bound to model)">
      <p>
        Selected items (click to un-select):
        <button
          v-for="item in selectedItems"
          :key="item.id"
          @click="selectedItems.splice(selectedItems.indexOf(item), 1)"
        >
          {{ item.id }}
        </button>
      </p>

      <input id="isSelectable" type="checkbox" v-model="selectable">
      <label for="isSelectable">Selectable</label><br>

      <label for="selectMode">Select mode</label>
      <select id="selectMode" v-model="selectMode">
        <option value="single">single</option>
        <option value="multiple">Multiple</option>
      </select><br>

      <label for="selectedColor">Selected color</label>
      <select id="selectedColor" v-model="selectedColor">
        <option value="primary">primary</option>
        <option value="danger">danger</option>
        <option value="warning">warning</option>
      </select>

      <va-data-table
        :items="items"
        :columns="columns"
        :selectable="selectable"
        v-model="selectedItems"
        :select-mode="selectMode"
        :selected-color="selectedColor"
      >
        <template #header(address)>Street</template>
        <template #header(company)>Company Name</template>

        <template #cell(address)="{ rowData }">{{ rowData.address.street }}</template>
        <template #cell(company)="{ rowData }">{{ rowData.company.name }}</template>
      </va-data-table>
    </VbCard>

    <VbCard title="Pagination">
      <input id="perPage" type="number" v-model="perPage">
      <label for="perPage">Items per page</label><br>

      <input id="currentPage" type="number" v-model="currentPage">
      <label for="currentPage">Current page</label><br>

      <va-data-table
        :items="items"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <template #header(address)>Street</template>
        <template #header(company)>Company Name</template>

        <template #cell(address)="{ rowData }">{{ rowData.address.street }}</template>
        <template #cell(company)="{ rowData }">{{ rowData.company.name }}</template>
      </va-data-table>
    </VbCard>
  </VbDemo>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import shuffle from 'lodash/shuffle'
import cloneDeep from 'lodash/cloneDeep'
import VaDataTable from './'
import VaChip from '../va-chip'
import VaAlert from '../va-alert'

export default defineComponent({
  name: 'VaDataTableNewDemo',

  components: {
    VaDataTable,
    VaChip,
    VaAlert,
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
      {
        id: 4,
        name: 'Patricia Lebsack',
        username: 'Karianne',
        email: 'Julianne.OConner@kory.org',
        address: {
          street: 'Hoeger Mall',
          suite: 'Apt. 692',
          city: 'South Elvis',
          zipcode: '53919-4257',
          geo: {
            lat: '29.4572',
            lng: '-164.2990',
          },
        },
        phone: '493-170-9623 x156',
        website: 'kale.biz',
        company: {
          name: 'Robel-Corkery',
          catchPhrase: 'Multi-tiered zero tolerance productivity',
          bs: 'transition cutting-edge web services',
        },
      },
      {
        id: 5,
        name: 'Chelsey Dietrich',
        username: 'Kamren',
        email: 'Lucio_Hettinger@annie.ca',
        address: {
          street: 'Skiles Walks',
          suite: 'Suite 351',
          city: 'Roscoeview',
          zipcode: '33263',
          geo: {
            lat: '-31.8129',
            lng: '62.5342',
          },
        },
        phone: '(254)954-1289',
        website: 'demarco.info',
        company: {
          name: 'Keebler LLC',
          catchPhrase: 'User-centric fault-tolerant solution',
          bs: 'revolutionize end-to-end systems',
        },
      },
    ]

    const columns = [
      { key: 'username', sortable: true },
      { key: 'email', sortable: true },
      { key: 'name', sortable: true },
      { key: 'id', sortable: true, sortingFn: () => -1 },
      { key: 'address', sortable: true },
      { key: 'company', sortable: true },
    ]

    return {
      items: shuffle(cloneDeep(users)),
      columns,

      filter: '',
      useCustomFilteringFn: false,
      filteredCount: users.length,

      sortBy: 'username',
      sortingOrder: 'asc',

      selectable: true,
      selectedItems: [],
      selectMode: 'single',
      selectedColor: 'danger',

      perPage: 2,
      currentPage: 1,

      rowEventType: '',
      rowId: '',
    }
  },

  computed: {
    customFilteringFn () {
      return (this as any).useCustomFilteringFn ? (this as any).filterExact : undefined
    },
  },

  methods: {
    shuffleItems () {
      (this as any).items = shuffle((this as any).items)
    },

    filterExact (source: any) {
      return source?.toString?.() === (this as any).filter
    },
  },
})
</script>
