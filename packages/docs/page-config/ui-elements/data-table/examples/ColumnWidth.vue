<template>
  <VaDataTable 
    :columns="[
      { key: 'id', label: '50px', width: '50px' },
      { key: 'name', label: '100px', width: '100px' },
      { key: 'username', label: '200px', width: '200px' },
      { key: 'email', label: '400px', width: '300px' },
    ]"
    :items="items"
  />
</template>

<script setup>
  const items = [
    {
      id: 1,
      name: "Leanne",
      username: "Bret",
      email: "Sincere@april.biz",
    },
    {
      id: 2,
      name: "Ervin",
      username: "Antonette",
      email: "Shanna@melissa.tv",
    },
    {
      id: 3,
      name: "Clementine",
      username: "Samantha",
      email: "Nathan@yesenia.net",
    },
    {
      id: 4,
      name: "Patricia",
      username: "Karianne",
      email: "Julianne.OConner@kory.org",
    },
    {
      id: 5,
      name: "Chelsey",
      username: "Kamren",
      email: "Lucio_Hettinger@annie.ca",
    },
  ]
</script>
