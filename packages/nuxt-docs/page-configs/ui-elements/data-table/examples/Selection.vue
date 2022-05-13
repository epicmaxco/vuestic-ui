<template>
  <div class="row">
    <va-checkbox
      class="flex mb-2 md4"
      label="Selectable"
      v-model="selectable"
    />

    <va-select
      class="flex mb-2 md4"
      v-model="selectMode"
      label="Select mode"
      :options="selectModeOptions"
    />

    <va-select
      class="flex mb-2 md4"
      v-model="selectedColor"
      label="Selected color"
      :options="selectColorOptions"
    />
  </div>

  <va-data-table
    :items="items"
    :columns="columns"
    :selectable="selectable"
    v-model="selectedItems"
    :select-mode="selectMode"
    :selected-color="selectedColor"
    @selectionChange="selectedItemsEmitted = $event.currentSelectedItems"
  />

  <va-alert class="mt-3" border="left">
    <span>
      Selected items (click to unselect):
      <va-chip
        class="ml-2"
        :key="item.id"
        v-for="item in selectedItemsEmitted"
        @click="unselectItem(item)"
      >
        {{ item.id }}
      </va-chip>
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

    const selectModeOptions = ["single", "multiple"];
    const selectColorOptions = ["primary", "danger", "warning", "#888888"];

    return {
      items: users,
      columns,
      selectable: true,
      selectedItems: [],
      selectedItemsEmitted: [],
      selectMode: "multiple",
      selectedColor: "#888888",
      selectModeOptions,
      selectColorOptions,
    };
  },

  watch: {
    selectable(value) {
      if (!value) {
        this.selectedItems = [];
      }
    },
  },

  methods: {
    unselectItem(item) {
      const index = this.selectedItems.indexOf(item);
      this.selectedItems = [
        ...this.selectedItems.slice(0, index),
        ...this.selectedItems.slice(index + 1),
      ];
    },
  },
});
</script>
