<template>
  <va-data-table
    class="table-inline-example"
    :items="items"
    :columns="columns"
  >
    <template
      v-for="item in columns"
      :key="item.key"
      #[`cell(${item.key})`]="{ value, row }"
    >
      <div class="table-inline-example__cell">
        <va-value #default="doShowInput">
          <va-input
            v-if="doShowInput.value"
            :model-value="value"
            @change="() => { 
              row.rowData[item.key] = $event.target.value
              doShowInput.value = false
            }"
            @blur="doShowInput.value = false"
            @vue:mounted="$event.component.ctx.focus()"
          />
          <span
            class="table-inline-example__item"
            :class="doShowInput.value ? 'table-inline-example__item--hidden' : ''"
            @click="doShowInput.value = true"
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
