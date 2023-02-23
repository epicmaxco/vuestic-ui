<template>
  <va-data-table
    :items="items"
    :columns="columns"
    striped
  >
    <template #cell(actions)="{ row }">
      <va-button @click="row.toggleRowDetails()">Expand</va-button>
    </template>

    <template #expandableRow="row">
      <va-alert outline>
        This is {{ row.cells[0].value }} details.
      </va-alert>
    </template>
  </va-data-table>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    const users = [
      {
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
      },
      {
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
      },
      {
        name: "Clementine Bauch",
        username: "Samantha",
        email: "Nathan@yesenia.net",
      },
      {
        name: "Patricia Lebsack",
        username: "Karianne",
        email: "Julianne.OConner@kory.org",
      },
      {
        name: "Chelsey Dietrich",
        username: "Kamren",
        email: "Lucio_Hettinger@annie.ca",
      },
    ];

    const columns = [
      { key: "name" },
      { key: "username" },
      { key: "email" },
      { key: "actions", width: 80 },
    ];

    return {
      items: users,
      columns
    };
  },
});
</script>
