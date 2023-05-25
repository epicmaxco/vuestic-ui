<template>
  <div class="grid sm:grid-cols-2 md:grid-cols-5 gap-6 mb-6">
    <va-input
      v-model.number="perPage"
      type="number"
      placeholder="Items..."
      label="Items per page"
    />
    <va-input
      v-model.number="currentPage"
      type="number"
      placeholder="Page..."
      label="Current page"
    />
    <va-input
      v-model="filter"
      class="sm:col-span-2 md:col-span-3"
      placeholder="Filter..."
    />
  </div>

  <va-data-table
    :items="items"
    :columns="columns"
    :per-page="perPage"
    :current-page="currentPage"
    selectable
    :filter="filter"
    @filtered="filtered = $event.items"
  >
    <template #bodyAppend>
      <tr>
        <td colspan="6">
          <div class="flex justify-center mt-4">
            <va-pagination
              v-model="currentPage"
              :pages="pages"
            />
          </div>
        </td>
      </tr>
    </template>
  </va-data-table>
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
      { key: "id", sortable: true, width: "60px" },
      { key: "username", sortable: true, width: "120px" },
      { key: "name", sortable: true, width: "170px" },
      { key: "email", sortable: true, width: "250px" },
      { key: "phone" },
    ];

    return {
      items: users,
      columns,
      perPage: 3,
      currentPage: 1,
      filter: "",
      filtered: users,
    };
  },

  computed: {
    pages() {
      return this.perPage && this.perPage !== 0
        ? Math.ceil(this.filtered.length / this.perPage)
        : this.filtered.length;
    },
  },
});
</script>
