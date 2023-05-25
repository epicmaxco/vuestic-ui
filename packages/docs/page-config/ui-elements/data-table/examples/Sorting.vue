<template>
  <div class="grid sm:grid-cols-2 gap-6 mb-6">
    <va-select
      v-model="sortBy"
      label="Sort by"
      :options="sortByOptions()"
    />
    <va-select
      v-model="sortingOrder"
      label="Sorting order"
      :options="sortingOrderOptions"
      :value-by="(option) => option.value"
    />
  </div>

  <va-data-table
    v-model:sort-by="sortBy"
    v-model:sorting-order="sortingOrder"
    :items="items"
    :columns="columns"
    hoverable
  />
</template>

<script>
import { defineComponent } from "vue";
import shuffle from "lodash/shuffle";

export default defineComponent({
  data() {
    const users = [
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "92998-3874",
          geo: {
            lat: "-37.3159",
            lng: "81.1496",
          },
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
          name: "Romaguera-Crona",
          catchPhrase: "Multi-layered client-server neural-net",
          bs: "harness real-time e-markets",
        },
      },
      {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        address: {
          street: "Victor Plains",
          suite: "Suite 879",
          city: "Wisokyburgh",
          zipcode: "90566-7771",
          geo: {
            lat: "-43.9509",
            lng: "-34.4618",
          },
        },
        phone: "010-692-6593 x09125",
        website: "anastasia.net",
        company: {
          name: "Deckow-Crist",
          catchPhrase: "Proactive didactic contingency",
          bs: "synergize scalable supply-chains",
        },
      },
      {
        id: 3,
        name: "Clementine Bauch",
        username: "Samantha",
        email: "Nathan@yesenia.net",
        address: {
          street: "Douglas Extension",
          suite: "Suite 847",
          city: "McKenziehaven",
          zipcode: "59590-4157",
          geo: {
            lat: "-68.6102",
            lng: "-47.0653",
          },
        },
        phone: "1-463-123-4447",
        website: "ramiro.info",
        company: {
          name: "Romaguera-Jacobson",
          catchPhrase: "Face to face bifurcated interface",
          bs: "e-enable strategic applications",
        },
      },
      {
        id: 4,
        name: "Patricia Lebsack",
        username: "Karianne",
        email: "Julianne.OConner@kory.org",
        address: {
          street: "Hoeger Mall",
          suite: "Apt. 692",
          city: "South Elvis",
          zipcode: "53919-4257",
          geo: {
            lat: "29.4572",
            lng: "-164.2990",
          },
        },
        phone: "493-170-9623 x156",
        website: "kale.biz",
        company: {
          name: "Robel-Corkery",
          catchPhrase: "Multi-tiered zero tolerance productivity",
          bs: "transition cutting-edge web services",
        },
      },
      {
        id: 5,
        name: "Chelsey Dietrich",
        username: "Kamren",
        email: "Lucio_Hettinger@annie.ca",
        address: {
          street: "Skiles Walks",
          suite: "Suite 351",
          city: "Roscoeview",
          zipcode: "33263",
          geo: {
            lat: "-31.8129",
            lng: "62.5342",
          },
        },
        phone: "(254)954-1289",
        website: "demarco.info",
        company: {
          name: "Keebler LLC",
          catchPhrase: "User-centric fault-tolerant solution",
          bs: "revolutionize end-to-end systems",
        },
      },
    ];

    const columns = [
      { key: "id", sortable: true, sortingOptions: ["desc", "asc"] },
      { key: "username", sortable: true },
      { key: "name", sortable: true },
      { key: "address.city", name: "city", label: "City", sortable: true },
      { key: "phone" },
    ];

    const sortingOrderOptions = [
      { text: "asc", value: "asc" },
      { text: "desc", value: "desc" },
      { text: "no sorting", value: null },
    ];

    return {
      items: shuffle(users),
      columns,
      sortBy: "username",
      sortingOrder: "asc",
      sortingOrderOptions,
    };
  },

  methods: {
    sortByOptions() {
      return this.columns
        .map(({ name, key, sortable }) => sortable && (name || key))
        .filter(Boolean);
    },
  },
});
</script>
