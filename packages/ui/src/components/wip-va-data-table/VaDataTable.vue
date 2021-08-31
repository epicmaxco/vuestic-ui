<template>
  <va-inner-loading :loading="loading" :color="loadingColor">
    <table class="va-data-table" :class="{ striped }" v-bind="$attrs">
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

<!--        Show the respective placeholder when there's no items either due to they're not provided or due to the harsh filtering conditions applied. When setting the colspan, make sure to account the possibly visible checkbox column-->
        <tr v-if="showNoDataHtml" class="no-data"><td :colspan="columns.length + (selectable ? 1 : 0)" v-html="noDataHtml"/></tr>
        <tr v-if="showNoDataFilteredHtml" class="no-data"><td :colspan="columns.length + (selectable ? 1 : 0)" v-html="noDataFilteredHtml"/></tr>

<!--        Render rows (`tr`s). Select a row on click or select a bunch of rows on shift-click-->
        <tr v-for="(row, index) in rows" @click.exact="toggleRowSelection(row)" @click.ctrl.exact="ctrlSelectRow(row)" @click.shift.exact="shiftSelectRows(row)" :class="{ selectable, selected: isRowSelected(row) }" :style="rowCSSVariables">
<!--          Pagination. If there's some value to the `per-page` prop, then check if the element with that index should be visible. If no `per-page` then just render anyway.      -->
          <template v-if="perPage ? (index >= perPage * (currentPage - 1)) && (index < perPage * currentPage) : true">
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
          </template>
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
import {computed, defineComponent, PropType, toRefs} from "vue";
import useColumns, { ITableColumn } from "./hooks/useColumns";
import useRows, { ITableItem } from "./hooks/useRows";
import useFilterable, { TFilteringFn } from "./hooks/useFilterable";
import useSortable, { TSortingOrder } from "./hooks/useSortable";
import useSelectable, { TSelectMode } from "./hooks/useSelectable";
import useStyleable from "./hooks/useStyleable";

/*
  TODO: consider a possibility to lazy-load the hooks with dynamic imports based on respective props' values. E.G.

  if (selectable.value) {
    const { default: useSelectable } = await import("./hooks/useSelectable");
  }

  // Would be a cool feature (if possible at all).
*/

export default defineComponent({
  name: "VaDataTable",

  // so that the attributes could be bypassed to the <table> element rather then applied to <va-inner-loading>
  inheritAttrs: false,

  props: {
    columns: {
      type: Array as PropType<(string | ITableColumn)[]>,
      default: () => [] as (string | ITableColumn)[]
    },
    items: {
      type: Array as PropType<ITableItem[]>,
      default: () => [] as ITableItem[]
    },
    filter: {
      type: String,
      default: "",
    },
    filteringFn: {
      type: Function as PropType<TFilteringFn>
    },
    sortBy: { // model-able
      type: String,
      default: "",
    },
    sortingOrder: { // model-able
      type: String as PropType<TSortingOrder>,
      default: "asc",
    },
    modelValue: { // model-able
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
      type: String,
      default: "primary",
    },
    perPage: {
      type: Number,
    },
    currentPage: {
      type: Number,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingColor: {
      type: String,
      default: "primary",
    },
    noDataHtml: {
      type: String,
      default: "No items",
    },
    noDataFilteredHtml: {
      type: String,
      default: "No items match the provided filtering condition"
    },
    hideDefaultHeader: {
      type: Boolean,
      default: false,
    },
    footClone: {
      type: Boolean,
      default: false,
    },
    striped: {
      type: Boolean,
      default: false,
    }
  },

  // `modelValue` is selected items
  emits: ["update:modelValue", "update:sortBy", "update:sortingOrder", "filter"],

  setup(props, {slots, emit}) {
    // columns and rows
    const {
      columns: rawColumns,
      items: rawItems,
    } = toRefs(props);

    const {columns} = useColumns(rawColumns, rawItems);
    const {rows: unfilteredRows} = useRows(rawItems, columns);

    // filtering
    const {filter, filteringFn} = toRefs(props);
    const {filteredRows: rows} = useFilterable(unfilteredRows, filter, filteringFn, emit);

    // sorting
    const {sortBy, sortingOrder} = toRefs(props);
    const {sortByProxy, sortingOrderProxy, toggleSorting} = useSortable(columns, rows, sortBy, sortingOrder, emit);

    // selection
    const {selectMode, modelValue: selectedItems} = toRefs(props);

    const {
      selectedItemsProxy,
      toggleRowSelection,
      ctrlSelectRow,
      shiftSelectRows,
      toggleBulkSelection,
      isRowSelected,
      severalRowsSelected,
    } = useSelectable(rows, selectedItems, selectMode, emit);

    // styling
    const {selectable, selectedColor} = toRefs(props);
    const {getHeadCSSVariables, rowCSSVariables, getCellCSSVariables} = useStyleable(selectable, selectedColor);

    // other
    const {loading, noDataHtml, noDataFilteredHtml, hideDefaultHeader, footClone, striped} = toRefs(props);

    const showNoDataHtml = computed(() => {
      return rawItems.value.length < 1;
    });

    const showNoDataFilteredHtml = computed(() => {
      return rows.value.length < 1;
    });

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
      showNoDataHtml,
      noDataHtml,
      showNoDataFilteredHtml,
      noDataFilteredHtml,
      hideDefaultHeader,
      footClone,
      striped,
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

  &.striped {
    tbody {
      .no-data {
        text-align: center;
        vertical-align: middle;
      }

      tr:nth-child(2n) {
        background-color: #f5f8f9;

        &:hover {
          background-color: var(--hover-color);
        }

        &.selected {
          background-color: var(--selected-color);
        }
      }
    }
  }

  tfoot {
    border-top: 2px solid var(--va-dark);
  }
}
</style>
