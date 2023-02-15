<template>
  <va-button @click="shuffleItems">
    Shuffle and update items
  </va-button>

  <va-data-table
    v-model="selectedItems"
    :items="items"
    items-track-by="username"
    :columns="columns"
    selectable
    select-mode="multiple"
    @selection-change="selectedItemsEmitted = $event.currentSelectedItems"
  />

  <va-alert
    class="mt-3"
    color="info"
    outline
  >
    <span>
      Selected items (click to unselect):
      <va-chip
        v-for="item in selectedItemsEmitted"
        :key="item"
        class="ml-2"
        @click="unselectItem(item)"
      >
        {{ item }}
      </va-chip>
    </span>
  </va-alert>
</template>

<script>
import { defineComponent } from "vue";
import shuffle from "lodash/shuffle.js";

export default defineComponent({
  data() {
    const users = [
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        phone: "1-770-736-8031 x56442",
      },
      {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        phone: "010-692-6593 x09125",
      },
      {
        id: 3,
        name: "Clementine Bauch",
        username: "Samantha",
        email: "Nathan@yesenia.net",
        phone: "1-463-123-4447",
      },
      {
        id: 4,
        name: "Patricia Lebsack",
        username: "Karianne",
        email: "Julianne.OConner@kory.org",
        phone: "493-170-9623 x156",
      },
      {
        id: 5,
        name: "Chelsey Dietrich",
        username: "Kamren",
        email: "Lucio_Hettinger@annie.ca",
        phone: "(254)954-1289",
      },
    ];

    const columns = [
      { key: "id", sortable: true },
      { key: "username", sortable: true },
      { key: "name", sortable: true },
      { key: "email", sortable: true },
      { key: "phone", sortable: true },
    ];

    return {
      items: users,
      columns,
      selectedItems: ["Antonette"],
      selectedItemsEmitted: [],
    };
  },

  methods: {
    unselectItem(item) {
      this.selectedItems = this.selectedItems.filter(
        (selectedItem) => selectedItem !== item
      );
    },
    shuffleItems() {
      const items = this.items.map((item) => ({
        ...item,
        name: shuffle(item.name).join(""),
      }));
      this.items = shuffle(items);
    },
  },
});
</script>
