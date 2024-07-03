<template>
  <VaDataTable ref="table" :items="items" />
  <Teleport v-if="scrollElement" :to="scrollElement">
    <VaStickyScrollbar />
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'

const table = ref()
const scrollElement = computed(() => table.value?.$el)

const items = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    github: 'bretooo00000',
    address: 'Kulas Light, Apt. 556, Gwenborough, 92998-3874',
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    github: 'antonette2048929',
    address: 'Victor Plains, Suite 879, Wisokyburgh, 90566-7771',
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
    phone: "1-463-123-4447",
    website: "ramiro.info",
    github: 'samantha123',
    address: 'Douglas Extension, Suite 847, McKenziehaven, 59590-4157',
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    username: "Karianne",
    email: "Julianne.OConner@kory.org",
    phone: "493-170-9623 x156",
    website: "kale.biz",
    github: 'karianne',
    address: 'Hoeger Mall, Apt. 692, South Elvis, 53919-4257',
  },
  {
    id: 5,
    name: "Chelsey Dietrich",
    username: "Kamren",
    email: "Lucio_Hettinger@annie.ca",
    phone: "(254)954-1289",
    website: "demarco.info",
    github: 'kamren',
    address: 'Skiles Walks, Suite 351, Roscoeview, 33263',
  },
];
</script>
