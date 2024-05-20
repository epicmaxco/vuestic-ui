<template>
  <div class="grid sm:grid-cols-2 gap-6 mb-6">
    <VaSelect
      v-model="selectMode"
      label="Select mode"
      :options="selectModeOptions"
    />
    <VaSelect
      v-model="selectedColor"
      label="Selected color"
      :options="selectColorOptions"
    />
  </div>

  <VaDataTable
    v-model="selectedItems"
    :items="items"
    :columns="columns"
    selectable
    :select-mode="selectMode"
    :selected-color="selectedColor"
    @selection-change="selectedItemsEmitted = $event.currentSelectedItems"
  />

  <VaAlert
    class="!mt-6"
    color="info"
    outline
  >
    Selected items (click to unselect):
    <VaChip
      v-for="item in selectedItemsEmitted"
      :key="item.id"
      class="ml-2"
      @click="unselectItem(item)"
    >
      {{ item.id }}
    </VaChip>
  </VaAlert>
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
      selectedItems: [items[1]],
      selectedItemsEmitted: [],
      selectMode: "multiple",
      selectedColor: "primary",
      selectModeOptions: ["single", "multiple"],
      selectColorOptions: ["primary", "danger", "warning", "#EF467F"],
    };
  },

  methods: {
    unselectItem(item) {
      this.selectedItems = this.selectedItems.filter(
        (selectedItem) => selectedItem !== item
      );
    },
  },
});
</script>
