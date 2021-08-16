<template>
  <va-inner-loading :loading="busy" color="primary">
    <table class="va-data-table" v-bind="$attrs">
      <thead>
       <slot name="head.prepend"/>
        <tr>
          <th v-if="selectable">
            <input v-if="selectMode === 'multiple'" type="checkbox" :indeterminate="selectedItems.length > 0 && selectedItems.length < rows.length" @change="toggleBulkSelection">
          </th>

          <th v-for="column in columns" :title="column.headerTitle" v-bind="column">
            <slot v-if="`head(${column.key})` in slots" :name="`head(${column.key})`">
              {{ column.label }}
            </slot>

            <slot v-else name="head" v-bind="column">
              {{ column.label }}
            </slot>
          </th>
        </tr>
       <slot name="head.append"/>
      </thead>

      <tbody>
        <slot name="body.prepend" />

        <tr v-for="row in rows" @click="toggleRowSelection(row)" :class="{ selectable }">
          <td v-if="selectable">
            <input v-if="selectMode === 'multiple'" type="checkbox" v-model="selectedItems" :value="row.source" @click.stop>
            <input v-else-if="selectMode === 'single'" type="checkbox" :checked="selectedItems.includes(row.source)">
          </td>

          <td v-for="cell in row.cells">
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
        <slot name="foot.prepend"/>
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
        <slot name="foot.append"/>
      </tfoot>
    </table>
  </va-inner-loading>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, ref, toRef, toRefs, watch} from "vue";
import useColumns, {ITableColumn} from "./hooks/useColumns";
import useRows, {ITableItem} from "./hooks/useRows";
import useSelectable, {TSelectMode} from "./hooks/useSelectable";

export default defineComponent({
  name: "VaDataTable",

  inheritAttrs: false,

  props: {
    columns: {
      type: Array as PropType<string[] | ITableColumn[]>,
    },
    items: {
      type: Array as PropType<ITableItem[]>,
      required: true,
    },
    modelValue: {
      type: Array as PropType<ITableItem[]>,
      default: () => [],
    },
    selectedItems: {
      type: Array as PropType<ITableItem[]>,
      default: [],
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    selectMode: {
      type: String as PropType<TSelectMode>,
      default: "multiple",
    },
    busy: {
      type: Boolean,
      default: false,
    },
    footClone: {
      type: Boolean,
      default: false,
    }
  },

  emits: ["update:modelValue"],

  setup(props, {slots, emit}) {
    // columns and rows
    const {
      columns: rawColumns,
      items: rawItems,
    } = toRefs(props);

    const {columns} = useColumns(rawColumns, rawItems);
    const {rows} = useRows(rawItems, columns);

    // selection
    const {selectable, selectMode, modelValue} = toRefs(props);
    const {selectedItems, toggleBulkSelection, toggleRowSelection} = useSelectable(selectMode, modelValue, rows, emit);

    // other
    const {busy, footClone} = toRefs(props);

    // expose
    return {
      slots,
      columns,
      rows,
      selectable,
      selectedItems,
      toggleBulkSelection,
      toggleRowSelection,
      busy,
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
    border-bottom: 2px solid var(--va-dark);
  }

  tbody {
    tr.selectable {
      cursor: pointer;
    }

    td {
      padding: 0.625rem;
    }
  }

  tfoot {
    border-top: 2px solid var(--va-dark);
  }
}
</style>
