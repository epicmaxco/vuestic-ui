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
        <va-value #default="v">
          <va-input
            v-if="v.value"
            :model-value="value"
            @change="updateItems(item.key, rowIndex, $event.target.value), v.value = false"
            @blur="v.value = false"
            @vue:mounted="$event.component.ctx.focus()"
          />
          <span
            :class="v.value ? 'table-inline-example__item--hidden' : 'table-inline-example__item'"
            @click="v.value = true"
          >
            {{ value }}
          </span>
        </va-value>
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
      items,
      columns,
    };
  },

  methods: {
    getSlotName(name) {
      return `cell(${name})`
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
