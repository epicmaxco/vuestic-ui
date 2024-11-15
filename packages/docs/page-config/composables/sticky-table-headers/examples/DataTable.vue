<template>
  <VaDataTable ref="table" :items="items" class="demo-va-data-table" />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStickyTableHeaders } from 'vuestic-ui'

const table = ref()
const scrollElement = computed(() => table.value?.$el)

useStickyTableHeaders(table, 75)

const repeatArray = (array, times) => {
  return Array.from({ length: times }, () => array).flat()
}

const items = repeatArray([
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
    phone: "1-463-123-4447",
    website: "ramiro.info",
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    username: "Karianne",
    email: "Julianne.OConner@kory.org",
    phone: "493-170-9623 x156",
    website: "kale.biz",
  },
  {
    id: 5,
    name: "Chelsey Dietrich",
    username: "Kamren",
    email: "Lucio_Hettinger@annie.ca",
    phone: "(254)954-1289",
    website: "demarco.info",
  },
], 4)
</script>

<style>
  .demo-va-data-table thead {
    outline: 1px solid var(--va-focus);
    outline-offset: -2px;
  }
</style>
