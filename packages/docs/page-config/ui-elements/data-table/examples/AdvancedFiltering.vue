<template>
  <div class="grid md:grid-cols-2 gap-6 mb-6">
    <VaInput v-model="filter" placeholder="Filter..." class="w-full" />
    <VaSelect
      v-model="filterByFields"
      placeholder="Select filter fields"
      :options="columnsWithName"
      value-by="value"
      multiple
    />
  </div>

  <VaDataTable
    :items="items"
    :columns="columns"
    :filter="filter"
    :filter-method="customFilteringFn"
    @filtered="filteredCount = $event.items.length"
  />

  <VaAlert class="!mt-6" color="info" outline>
    Number of filtered items:
    <VaChip>{{ filteredCount }}</VaChip>
  </VaAlert>
</template>

<script setup>
import { ref } from 'vue';

const items = [
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
  { key: "id", sortable: true },
  { key: "username", sortable: true },
  { key: "name", sortable: true },
  { key: "email", sortable: true },
  { key: "address.zipcode", label: "Zipcode" },
];

const columnsWithName = [
  { value: "id", text: "ID" },
  { value: "username", text: "Username" },
  { value: "name", text: "Name" },
  { value: "email", text: "Email" },
  { value: "address.zipcode", text: "Zipcode" },
];

const filter = ref("");
const filterByFields = ref([]);
const filteredCount = ref(items.length);

const customFilteringFn = (source, cellData) => {
  if (!filter.value) {
    return true;
  }

  if (filterByFields.value.length >= 1) {
    const searchInCurrentRow = filterByFields.value.some(
      (field) => cellData.column.key === field
    );
    if (!searchInCurrentRow) return false;
  }

  const filterRegex = new RegExp(filter.value, "i");

  return filterRegex.test(source);
};
</script>
