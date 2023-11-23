<template>
  <VaDataTable
    class="table-inline"
    :items="items"
    :columns="columns"
  >
    <template
      v-for="item in columns"
      :key="item.key"
      #[`cell(${item.key})`]="{ value, row }"
    >
      <div class="table-inline__cell">
        <VaValue v-slot="doShowInput">
          <VaInput
            v-if="doShowInput.value"
            :model-value="value"
            @change="($event) => {
              row.rowData[item.key] = $event.target.value
              doShowInput.value = false
            }"
            @blur="doShowInput.value = false"
            @vue:mounted="$event.component.ctx.focus()"
          />
          <span
            class="table-inline__item"
            :class="doShowInput.value ? 'table-inline__item--hidden' : ''"
            @click="doShowInput.value = true"
          >
            {{ value }}
          </span>
        </VaValue>
      </div>
    </template>
  </VaDataTable>
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
.table-inline {
  &__cell {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
  }

  &__item {
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
