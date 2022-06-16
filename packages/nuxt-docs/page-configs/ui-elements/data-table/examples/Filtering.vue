<template>
  <div class="row">
    <va-input class="flex mb-2 md6" placeholder="Filter..." v-model="filter" />

    <va-checkbox
      class="flex mb-2 md6"
      label="Use custom filtering function (looks for an exact match)"
      v-model="useCustomFilteringFn"
    />
  </div>

  <va-data-table
    :items="items"
    :columns="columns"
    :filter="filter"
    :filter-method="customFilteringFn"
    @filtered="filteredCount = $event.items.length"
  />

  <va-alert class="mt-3" border="left">
    <span>
      Number of filtered items:
      <va-chip>{{ filteredCount }}</va-chip>
    </span>
  </va-alert>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    const users = [
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
    ];

    const columns = [
      { key: "id", sortable: true },
      { key: "username", sortable: true },
      { key: "name", sortable: true },
      { key: "email", sortable: true },
      { key: "phone" },
    ];

    return {
      items: users,
      columns,
      filter: "",
      useCustomFilteringFn: false,
      filteredCount: users.length,
    };
  },

  computed: {
    customFilteringFn() {
      return this.useCustomFilteringFn ? this.filterExact : undefined;
    },
  },

  methods: {
    filterExact(source) {
      if (this.filter === "") {
        return true;
      }

      return source?.toString?.() === this.filter;
    },
  },
});
</script>
