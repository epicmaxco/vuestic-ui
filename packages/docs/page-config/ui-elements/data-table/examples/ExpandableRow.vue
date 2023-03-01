<template>
  <va-data-table
    :items="items"
    :columns="columns"
    striped
  >
    <template #cell(actions)="{ row, isExpanded }">
      <va-button @click="row.toggleRowDetails()">{{  isExpanded ? 'Collapse': 'Expand' }}</va-button>
    </template>

    <template #expandableRow="{ cells }">
      <va-alert outline>
        This is {{ cells[0].value }} details.
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
