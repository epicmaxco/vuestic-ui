<template>
  <va-inner-loading :loading="busy" color="primary">
    <table class="va-data-table" v-bind="$attrs">
      <thead>
       <slot name="head.prepend"/>
        <tr v-if="!hideDefaultHeader">
          <th v-if="selectable">
            <input v-if="selectMode === 'multiple'" type="checkbox" :indeterminate="selectedItems.length > 0 && selectedItems.length < rows.length" @change="toggleBulkSelection">
          </th>

          <th
            v-for="column in columns"
            :title="column.headerTitle"
            @click.exact="column.sortable && sortByColumn(column)"
            :style="getHeadCSSVariables(column)"
          >
            <slot v-if="`head(${column.key})` in slots" :name="`head(${column.key})`" v-bind="column">
              <span>{{ column.label }}</span>
            </slot>

            <slot v-else name="head" v-bind="column">
              <span>{{ column.label }}</span>
            </slot>

            <va-icon v-if="sortedBy?.key === column.key" :name="sortingOrder === 'asc' ? 'expand_less' : 'expand_more'" size="small"/>
          </th>
        </tr>
       <slot name="head.append"/>
      </thead>

      <tbody>
        <slot name="body.prepend" />

        <tr v-for="row in rows" @click.exact="toggleRowSelection(row)" @click.shift.exact="toggleRowSelection(row, true)" :class="{ selectable, selected: isRowSelected(row) }" :style="rowCSSVariables">
          <td v-if="selectable">
            <input v-if="selectMode === 'multiple'" type="checkbox" v-model="selectedItems" :value="row.source" @click.stop>
            <input v-else-if="selectMode === 'single'" type="checkbox" :checked="selectedItems.includes(row.source)">
          </td>

          <td v-for="cell in row.cells" :style="getCellCSSVariables(cell)">
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
import {defineComponent, PropType, toRefs} from "vue";
import useColumns, {ITableColumn} from "./hooks/useColumns";
import useRows, {ITableItem} from "./hooks/useRows";
import useSelectable, {TSelectMode} from "./hooks/useSelectable";
import useStylable from "./hooks/useStylable";
import useSortable from "./hooks/useSortable";

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
    selectable: {
      type: Boolean,
      default: false,
    },
    selectMode: {
      type: String as PropType<TSelectMode>,
      default: "multiple",
    },
    selectedColor: {
      type: String as PropType<string>,
      default: "primary",
    },
    busy: {
      type: Boolean,
      default: false,
    },
    hideDefaultHeader: {
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
    const {selectable, selectMode, modelValue, selectedColor} = toRefs(props);
    const {selectedItems, toggleBulkSelection, toggleRowSelection, isRowSelected} = useSelectable(selectMode, modelValue, rows, emit);

    // sorting
    const {sortedBy, sortingOrder, sortByColumn} = useSortable(columns, rows);

    // styling
    const {getHeadCSSVariables, rowCSSVariables, getCellCSSVariables} = useStylable(selectable, selectedColor);

    // other
    const {busy, hideDefaultHeader, footClone} = toRefs(props);

    // expose
    return {
      slots,
      columns,
      rows,
      selectable,
      selectedItems,
      toggleBulkSelection,
      toggleRowSelection,
      isRowSelected,
      sortedBy,
      sortingOrder,
      sortByColumn,
      getHeadCSSVariables,
      rowCSSVariables,
      getCellCSSVariables,
      busy,
      hideDefaultHeader,
      footClone
    };
  }
})
</script>

<style lang="scss">
.va-data-table {
  cursor: default;

  th {
    padding: 0.625rem;
    line-height: 1.2;
    text-align: var(--align);
    vertical-align: var(--vertical-align);
    color: #34495e;
    font-size: 0.625rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    cursor: var(--cursor);
  }

  thead {
    border-bottom: 2px solid var(--va-dark);
  }

  tbody {
    tr.selectable {
      cursor: pointer;

      &:hover {
        background-color: var(--hover-color);
      }

      &.selected {
        background-color: var(--selected-color);
      }
    }

    td {
      padding: 0.625rem;
      text-align: var(--align);
      vertical-align: var(--vertical-align);
    }
  }

  tfoot {
    border-top: 2px solid var(--va-dark);
  }
}
</style>
