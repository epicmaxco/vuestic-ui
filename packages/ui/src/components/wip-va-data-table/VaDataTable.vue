<template>
  <va-inner-loading :loading="loading" color="primary">
    <table class="va-data-table" v-bind="$attrs">
      <thead>
<!--        Slot for prepending thead rows-->
        <slot name="head.prepend"/>
        <tr v-if="!hideDefaultHeader">

<!--          Only if `selectable` prop is true, render an additional column and if `select-mode` is `"multiple"` then render a checkbox clicking which selects/unselects all the rows (rendered as indeterminate if some rows are selected, but not all of them)-->
          <th v-if="selectable">
            <input v-if="selectMode === 'multiple'" type="checkbox" :indeterminate="severalRowsSelected" @change="toggleBulkSelection">
          </th>

<!--          Render the column headings (and apply sorting on clicks on a given heading). `column` here is an instance of `TableColumn`, not a prop, so don't be confused by WebStorm's warnings-->
          <th
            v-for="column in columns"
            :title="column.headerTitle"
            @click.exact="toggleSorting(column)"
            :style="getHeadCSSVariables(column)"
          >
<!--            Render a custom `head(columnKey)` slot if it's provided, or a custom common `head` (also if provided) or the column's label-->
            <slot v-if="`head(${column.key})` in slots" :name="`head(${column.key})`" v-bind="column"/>
            <slot v-else name="head" v-bind="column">
              <span>{{ column.label }}</span>
            </slot>

<!--            Sorting arrow (down is descending sorting, up is ascending)-->
            <va-icon v-if="sortBy === column.key && sortingOrder !== null" :name="sortingOrder === 'asc' ? 'expand_less' : 'expand_more'" size="small"/>
          </th>
        </tr>

<!--        Append rows in thead-->
        <slot name="head.append"/>
      </thead>

      <tbody>
<!--        Prepend tbody with rows (if any)-->
        <slot name="body.prepend" />

<!--        Render rows (`tr`s). Select a row on click or select a bunch of rows on shift-click-->
        <tr v-for="row in rows" @click.exact="toggleRowSelection(row)" @click.ctrl.exact="ctrlSelectRow(row)" @click.shift.exact="shiftSelectRows(row)" :class="{ selectable, selected: isRowSelected(row) }" :style="rowCSSVariables">

<!--          Render an additional column (for selectable tables only) with checkboxes to toggle selection-->
          <td v-if="selectable">
            <input type="checkbox" :checked="isRowSelected(row)" @click.stop="ctrlSelectRow(row)">
          </td>

<!--          Render cells for a given row-->
          <td v-for="cell in row.cells" :style="getCellCSSVariables(cell)">

<!--            Substitute cell's content with with `cell(columnKey)` slot's value or common `cell` slot's value or (if neither exists) with that cell's actual value-->
            <slot v-if="`cell(${cell.column.key})` in slots" :name="`cell(${cell.column.key})`" v-bind="cell"/>
            <slot v-else name="cell" v-bind="cell">
              {{ cell.value }}
            </slot>
          </td>
        </tr>

<!--        Append rows to tbody (ignored if no such slots provided)-->
        <slot name="body.append" />
      </tbody>

<!--      Duplicate header into footer if `footClone` prop is true-->
      <tfoot v-if="footClone">
        <slot name="foot.prepend"/>
        <tr>
          <th v-for="column in columns" :title="column.headerTitle" v-bind="column">
            <slot v-if="`foot(${column.key})` in slots" :name="`foot(${column.key})`"/>
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
import useStyleable from "./hooks/useStyleable";
import useSortable, {TSortingOrder} from "./hooks/useSortable";

/*
TODO: consider a possibility to lazy-load the hooks with dynamic imports based on respective props' values. E.G.

if (selectable.value) {
  const {default: useSelectable} = await import("./hooks/useSelectable");
}

Would be a could feature (if possible at all).
* */

export default defineComponent({
  name: "VaDataTable",

  // so that the attributes could be bypassed to the <table>, not applied to <va-inner-loading>
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
    sortBy: {
      type: String as PropType<string>,
      default: "",
    },
    sortingOrder: {
      type: String as PropType<TSortingOrder>,
      default: "asc",
    },
    loading: {
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

  emits: ["update:modelValue", "update:sortBy", "update:sortingOrder"],

  setup(props, {slots, emit}) {
    // columns and rows
    const {
      columns: rawColumns,
      items: rawItems,
    } = toRefs(props);

    const {columns} = useColumns(rawColumns, rawItems);
    const {rows} = useRows(rawItems, columns);

    // selection
    const {
      selectMode,
      modelValue: selectedItems
    } = toRefs(props);

    const {
      selectedItemsProxy,
      toggleRowSelection,
      ctrlSelectRow,
      shiftSelectRows,
      toggleBulkSelection,
      isRowSelected,
      severalRowsSelected,
    } = useSelectable(rows, selectedItems, selectMode, emit);

    // sorting
    const {sortBy, sortingOrder} = toRefs(props);
    const {sortByProxy, sortingOrderProxy, toggleSorting} = useSortable(columns, rows, sortBy, sortingOrder, emit);

    // styling
    const {selectable, selectedColor} = toRefs(props);
    const {getHeadCSSVariables, rowCSSVariables, getCellCSSVariables} = useStyleable(selectable, selectedColor);

    // other
    const {loading, hideDefaultHeader, footClone} = toRefs(props);

    // expose
    return {
      slots,
      columns,
      rows,
      selectable,
      selectedItems: selectedItemsProxy,
      toggleRowSelection,
      ctrlSelectRow,
      shiftSelectRows,
      toggleBulkSelection,
      isRowSelected,
      severalRowsSelected,
      sortBy: sortByProxy,
      sortingOrder: sortingOrderProxy,
      toggleSorting,
      getHeadCSSVariables,
      rowCSSVariables,
      getCellCSSVariables,
      loading,
      hideDefaultHeader,
      footClone
    };
  }
})
</script>

<style lang="scss">
// The variables used here are taken from a respective element's `style` attribute. See the `useStyleable` hook

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
