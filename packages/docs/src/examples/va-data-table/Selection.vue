<template>
  <div class="flex">
    <div class="flex row">
      <va-checkbox
        class="flex mb-2 md4"
        label="Selectable"
        v-model="selectable"
      />

      <va-select
        class="flex mb-2 md4"
        v-model="selectMode"
        label="Select mode"
        :options="selectModeOptions()"
      />

      <va-select
        class="flex mb-2 md4"
        v-model="selectedColor"
        label="Selected color"
        :options="selectColorOptions()"
      />
    </div>

    <va-data-table
      :items="items"
      :columns="columns"
      :selectable="selectable"
      v-model="selectedItems"
      :select-mode="selectMode"
      :selected-color="selectedColor"
    />

    <va-alert class="mt-3" border="left">
      <span>
        Selected items (click to un-select):
        <va-chip
          class="ml-2"
          :key="item.id"
          v-for="item in selectedItems"
          @click="selectedItems.splice(selectedItems.indexOf(item), 1)"
        >
          {{item.id}}
        </va-chip>
      </span>
    </va-alert>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import VaDataTable from 'vuestic-ui/src/components/va-data-table'
import { cloneDeep } from 'lodash-es'

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
      { key: 'id', sortable: true },
      { key: 'username', sortable: true },
      { key: 'name', sortable: true },
      { key: 'email', sortable: true },
      { key: 'phone', sortable: true },
    ]

    return {
      items: cloneDeep(users),
      columns,
      selectable: true,
      selectedItems: [],
      selectMode: 'single',
      selectedColor: 'danger',
    }
  },

  methods: {
    selectModeOptions () {
      return ['single', 'multiple']
    },
    selectColorOptions () {
      return ['primary', 'danger', 'warning', '#101010']
    },
  },
})
</script>
