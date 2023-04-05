<template>
  <va-data-table
    class="table-inline-example"
    :items="items"
    :columns="columns"
  >
    <template
      v-for="item in columns"
      :key="item.key"
      #[getSlotName(item.key)]="{ rowIndex, value }"
    >
      <div class="table-inline-example__cell">
        <va-input
          v-if="flag"
          autofocus
          :model-value="value"
          @change="updateAndBlur(item.key, rowIndex, $event.target.value)"
          @blur="flag = false"
        />
        <span
          :class="flag ? 'table-inline-example__item--hidden' : 'table-inline-example__item'"
          @click="flag = true"
        >
          {{ value }}
        </span>
      </div>
    </template>
  </va-data-table>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    const items = [
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
    ];

    const columns = [
      { key: "name", sortable: true },
      { key: "username", sortable: true },
      { key: "email", sortable: true },
    ];

    return {
      flag: false,
      items,
      columns,
    };
  },

  methods: {
    getSlotName(name) {
      return `cell(${name})`
    },
    updateAndBlur(key, index, value) {
      this.updateItems(key, index, value)
      this.flag = false
    },
    updateItems(key, index, value) {
      this.items = [
        ...this.items.slice(0, index),
        { ...this.items[index], [key]: value },
        ...this.items.slice(index + 1),
      ]
    },
  },
});
</script>

<style lang="scss" scoped>
.table-inline-example {
  .table-inline-example__cell {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
  }

  .table-inline-example__item {
    cursor: pointer;

    &--hidden {
      z-index: -1;
      opacity: 0;
      pointer-events: none;
    }
  }

  .va-input {
    position: absolute;
    width: 100%;
  }
}
</style>
