<template>
  <table class="va-data-table">
    <thead>
      <tr>
        <th v-for="header in normalizedHeaders">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <slot name="body.prepend" />

      <tr v-for="row in normalizedRows">
        <td v-for="cell in row">
          {{ cell }}
        </td>
      </tr>

      <slot name="body.append" />
    </tbody>
  </table>
</template>

<script lang="ts">
import {defineComponent, PropType, toRefs} from "vue";
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
      required: true
    }
  },

  setup(props) {
    const {columns, items} = toRefs(props);
    const {normalizedColumns, normalizedHeaders} = useColumns(columns, items);
    const {normalizedRows} = useRows(normalizedColumns, items);

    // expose
    return {
      normalizedHeaders,
      normalizedRows
    };
  }
})
</script>

<style lang="scss">
.va-data-table {
  thead {
    tr {
      border-bottom: 2px solid var(--va-dark);

      th {
        padding: 0.625rem;
        line-height: 1.2;
        color: #34495e;
        font-size: 0.625rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.6px;
      }
    }
  }

  tbody {
    td {
      padding: 0.625rem;
    }
  }
}
</style>
