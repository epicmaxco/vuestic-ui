<template>
  <div class="flex flex-wrap gap-6 mb-6">
    <va-checkbox
      v-model="isRowBind"
      label="Row bind"
    />

    <va-checkbox
      v-model="isCellBind"
      label="Cell bind"
    />
  </div>

  <va-data-table
    :items="items"
    :columns="columns"
    selectable
    :row-bind="isRowBind && getRowBind"
    :cell-bind="isCellBind && getCellBind"
  />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    const items = [
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
      items,
      columns,
      isCellBind: true,
      isRowBind: true,
    };
  },

  methods: {
    getRowBind(row) {
      if (row.name === "Ervin Howell") {
        return {
          class: ["custom-class"]
        };
      }
    },
    getCellBind(cell, row, column) {
      if (column.key === "username") {
        return {
          style: { color: "#EF476F" },
          onClick: () => console.log(cell),
        };
      }
    },
  },
});
</script>

<style lang="scss" scoped>
::v-deep(.custom-class) {
  text-decoration: line-through;
  pointer-events: none;
  background-color: var(--va-background-element);
}
</style>
