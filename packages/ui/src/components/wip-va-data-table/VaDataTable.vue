<template>
  <table class="va-data-table">
    <thead>
      <tr>
        <th v-for="column in columns" :title="column.headerTitle" v-bind="column">
          <slot v-if="`head(${column.key})` in slots" :name="`head(${column.key})`">
            {{ column.label }}
          </slot>

          <slot v-else name="head" v-bind="column">
            {{ column.label }}
          </slot>
        </th>
      </tr>
    </thead>

    <tbody>
      <slot name="body.prepend" />

      <tr v-for="row in rows">
        <td v-for="cell in row">
          <slot v-if="`cell(${cell.column.key})` in slots" :name="`cell(${cell.column.key})`" v-bind="cell">
            {{ cell.value }}
          </slot>

          <slot v-else name="cell" v-bind="cell">
            {{ cell.value }}
          </slot>
        </td>
      </tr>

      <slot name="body.append" />
    </tbody>

    <tfoot v-if="footClone">
      <tr>
        <th v-for="column in columns" :title="column.headerTitle" v-bind="column">
          <slot v-if="`foot(${column.key})` in slots" :name="`foot(${column.key})`">
            {{ column.label }}
          </slot>

          <slot v-else name="foot" v-bind="column">
            {{ column.label }}
          </slot>
        </th>
      </tr>
    </tfoot>
  </table>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, toRef, toRefs} from "vue";
import useColumns, {ITableColumn} from "./hooks/useColumns";
import useRows, {ITableItem} from "./hooks/useRows";

export default defineComponent({
  name: "VaDataTable",

  props: {
    columns: {
      type: Array as PropType<string[] | ITableColumn[]>,
    },
    items: {
      type: Array as PropType<ITableItem[]>,
      required: true,
    },
    footClone: {
      type: Boolean,
      default: false,
    }
  },

  setup(props, {slots}) {
    const {
      columns: rawColumns,
      items: rawItems,
      footClone
    } = toRefs(props);

    const {columns} = useColumns(rawColumns, rawItems);
    const {rows} = useRows(rawItems, columns);

    // expose
    return {
      slots,
      columns,
      rows,
      footClone
    };
  }
})
</script>

<style lang="scss">
.va-data-table {
  th {
    padding: 0.625rem;
    line-height: 1.2;
    color: #34495e;
    font-size: 0.625rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
  }

  thead {
    tr {
      border-bottom: 2px solid var(--va-dark);
    }
  }

  tbody {
    td {
      padding: 0.625rem;
    }
  }

  tfoot {
    tr {
      border-top: 2px solid var(--va-dark);
    }
  }
}
</style>
