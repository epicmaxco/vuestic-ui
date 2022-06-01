<template>
  <va-inner-loading
    class="va-data-table"
    aria-live="polite"
    :class="[
      { 'va-data-table--sticky': $props.stickyHeader },
      { 'va-data-table--scroll': !!$props.height },
    ]"
    :style="getStickyCSSVariables()"
    :loading="loading"
    :color="loadingColor"
    v-bind="componentAttributes"
  >
    <table
      class="va-data-table__table"
      :class="{ striped, selectable, hoverable, clickable }"
      v-bind="tableAttributes"
    >
      <colgroup v-if="'colgroup' in $slots">
        <slot name="colgroup" v-bind="columnsComputed" />
      </colgroup>

      <thead
        class="va-data-table__table-thead"
        :class="{ 'va-data-table__table-thead--sticky': $props.stickyHeader }"
      >
        <slot name="headerPrepend" />

        <tr
          v-if="!hideDefaultHeader"
          class="va-data-table__table-tr"
        >
          <th
            v-if="selectable"
            scope="col"
            :class="['va-data-table__table-th', 'va-data-table__table-cell-select']"
          >
            <va-checkbox
              v-if="selectMode === 'multiple'"
              aria-label="select all rows"
              :model-value="severalRowsSelected ? 'idl' : allRowsSelected"
              :true-value="true"
              :false-value="false"
              :color="selectedColor"
              indeterminate-value="idl"
              indeterminate
              @update:model-value="toggleBulkSelection"
            />
          </th>

          <th
            v-for="column in columnsComputed"
            :key="column.key"
            scope="col"
            :aria-sort="getColumnAriaSortOrder(column.key)"
            :title="column.headerTitle"
            :style="{ ...getHeaderCSSVariables(column), ...getStyles(column.headerStyle) }"
            :class="['va-data-table__table-th', ...getClasses(column.headerClasses)]"
            @click.exact="column.sortable && toggleSorting(column)"
          >
            <div class="va-data-table__table-th-wrapper">
              <span v-if="`header(${column.key})` in $slots">
                <slot :name="`header(${column.key})`" v-bind="column" />
              </span>

              <slot v-else name="header" v-bind="column">
                <span>{{ column.label }}</span>
              </slot>

              <div
                v-if="column.sortable"
                class="va-data-table__table-th-sorting"
                aria-hidden="true"
                @selectstart.prevent
              >
                <va-icon
                  :name="sortingOrderSync === 'asc' ? 'expand_less' : 'expand_more'"
                  size="small"
                  class="va-data-table__table-th-sorting-icon"
                  :class="{ active: sortBySync === column.key && sortingOrderSync !== null }"
                />
              </div>
            </div>
          </th>
        </tr>

        <slot name="headerAppend" />
      </thead>

      <tbody
        class="va-data-table__table-tbody"
        :style="rowCSSVariables"
      >
        <slot name="bodyPrepend" />

        <transition-group
          :name="animationName"
          appear
        >

          <tr
            v-if="showNoDataHtml"
            key="showNoDataHtml"
          >
            <td
              :colspan="columnsComputed.length + (selectable ? 1 : 0)"
              v-html="noDataHtml"
              class="no-data"
            />
          </tr>

          <tr
            v-else-if="showNoDataFilteredHtml"
            key="showNoDataFilteredHtml"
          >
            <td
              :colspan="columnsComputed.length + (selectable ? 1 : 0)"
              v-html="noDataFilteredHtml"
              class="no-data"
            />
          </tr>

          <tr
            v-for="row in rows"
            :key="`table-row_${row.initialIndex}`"
            class="va-data-table__table-tr"
            :class="{ selected: isRowSelected(row) }"
            @click="onRowClickHandler('row:click', $event, row)"
            @dblclick="onRowClickHandler('row:dblclick', $event, row)"
            @contextmenu="onRowClickHandler('row:contextmenu', $event, row)"
          >
            <td
              v-if="selectable"
              :class="['va-data-table__table-td', 'va-data-table__table-cell-select']"
              :key="`selectable_${row.initialIndex}`"
              @selectstart.prevent
            >
              <va-checkbox
                :model-value="isRowSelected(row)"
                :color="selectedColor"
                :aria-label="`select row ${row.initialIndex}`"
                @click.shift.exact="shiftSelectRows(row)"
                @click.ctrl.exact="ctrlSelectRow(row)"
                @click.exact="ctrlSelectRow(row)"
              />
            </td>

            <td
              v-for="cell in row.cells"
              :key="`table-cell_${cell.column.key + cell.rowIndex}`"
              :style="{ ...getCellCSSVariables(cell), ...getStyles(cell.column.style) }"
              :class="['va-data-table__table-td', ...getClasses(cell.column.classes)]"
            >
              <slot
                v-if="`cell(${cell.column.key})` in $slots"
                :name="`cell(${cell.column.key})`"
                v-bind="cell"
              />

              <slot v-else name="cell" v-bind="cell">
                {{ cell.value }}
              </slot>
            </td>
          </tr>
        </transition-group>

        <slot name="bodyAppend" />
      </tbody>

      <tfoot v-if="footerClone" class="va-data-table__table-tfoot">
        <slot name="footerPrepend" />

        <tr v-if="!hideDefaultHeader" class="va-data-table__table-tr">
          <th v-if="selectable" class="va-data-table__table-th">
            <va-checkbox
              v-if="selectMode === 'multiple'"
              aria-label="select all rows"
              :model-value="severalRowsSelected ? 'idl' : allRowsSelected"
              :true-value="true"
              :false-value="false"
              :color="selectedColor"
              indeterminate-value="idl"
              indeterminate
              @update:model-value="toggleBulkSelection"
            />
          </th>

          <th
            v-for="column in columnsComputed"
            :key="column.key"
            :title="column.headerTitle"
            @click.exact="allowFooterSorting && column.sortable && toggleSorting(column)"
            :style="{ ...getFooterCSSVariables(column), ...getStyles(column.headerStyle) }"
            :class="['va-data-table__table-th', ...getClasses(column.headerClasses)]"
          >
            <div class="va-data-table__table-th-wrapper">
              <span v-if="`footer(${column.key})` in $slots">
                <slot :name="`footer(${column.key})`" v-bind="column" />
              </span>

              <slot v-else name="footer" v-bind="column">
                <span>{{ column.label }}</span>
              </slot>

              <div
                v-if="allowFooterSorting && column.sortable"
                class="va-data-table__table-th-sorting"
                @selectstart.prevent
              >
                <va-icon
                  :name="sortingOrderSync === 'asc' ? 'expand_less' : 'expand_more'"
                  size="small"
                  class="va-data-table__table-th-sorting-icon"
                  :class="{ active: sortBySync === column.key && sortingOrderSync !== null }"
                />
              </div>
            </div>
          </th>
        </tr>

        <slot name="footerAppend" />
      </tfoot>
    </table>
  </va-inner-loading>
</template>

<script lang="ts">
import { computed, defineComponent, HTMLAttributes, PropType, TableHTMLAttributes } from 'vue'
import omit from 'lodash/omit.js'
import pick from 'lodash/pick.js'
import VaInnerLoading from '../va-inner-loading'
import VaCheckbox from '../va-checkbox'
import VaIcon from '../va-icon'
import useColumns from './hooks/useColumns'
import useRows from './hooks/useRows'
import useFilterable from './hooks/useFilterable'
import useSortable from './hooks/useSortable'
import usePaginatedRows from './hooks/usePaginatedRows'
import useSelectableRow from './hooks/useSelectableRow'
import useStylable from './hooks/useStylable'
import useAnimationName from './hooks/useAnimationName'
import {
  TTableColumnSource,
  ITableItem,
  TableRow,
  TFilterMethod,
  TSortingOrder,
  TSelectMode,
} from './types'

type emitNames = 'update:modelValue' |
  'update:sortBy' |
  'update:sortingOrder' |
  'filtered' |
  'sorted' |
  'selectionChange' |
  'row:click' |
  'row:dblclick' |
  'row:contextmenu'

/*
  TODO: consider a possibility to lazy-load the hooks with dynamic imports based on respective props' values. E.G.

  if (selectable.value) {
    const { default: useSelectableRow } = await import("./hooks/useSelectableRow");
  }

  // Would be a cool feature (if possible at all).
*/

export default defineComponent({
  name: 'VaDataTable',

  components: {
    VaInnerLoading,
    VaCheckbox,
    VaIcon,
  },

  inheritAttrs: false,

  props: {
    columns: { type: Array as PropType<TTableColumnSource[]>, default: () => [] as TTableColumnSource[] },
    items: { type: Array as PropType<ITableItem[]>, default: () => [] as ITableItem[] },
    modelValue: { type: Array as PropType<ITableItem[]> }, // selectedItems
    sortingOrder: { type: String as PropType<TSortingOrder> }, // model-able
    sortBy: { type: String }, // model-able
    filter: { type: String, default: '' },
    filterMethod: { type: Function as PropType<TFilterMethod> },
    hoverable: { type: Boolean, default: false },
    clickable: { type: Boolean, default: false },
    animated: { type: Boolean, default: true },
    selectable: { type: Boolean, default: false },
    selectMode: { type: String as PropType<TSelectMode>, default: 'multiple' },
    selectedColor: { type: String, default: 'primary' },
    perPage: { type: Number },
    currentPage: { type: Number },
    loading: { type: Boolean, default: false },
    loadingColor: { type: String, default: 'primary' },
    noDataHtml: { type: String, default: 'No items' },
    noDataFilteredHtml: { type: String, default: 'No items match the provided filtering condition' },
    hideDefaultHeader: { type: Boolean, default: false },
    footerClone: { type: Boolean, default: false },
    allowFooterSorting: { type: Boolean, default: false },
    striped: { type: Boolean, default: false },
    stickyHeader: { type: Boolean, default: false },
    height: { type: [String, Number] as PropType<string | number> },
  },

  emits: [
    'update:modelValue', // `modelValue` is selectedItems
    'update:sortBy',
    'update:sortingOrder',
    'filtered',
    'sorted',
    'selectionChange',
    'row:click',
    'row:dblclick',
    'row:contextmenu',
  ],

  setup (props, { attrs, emit }) {
    const { columnsComputed } = useColumns(props)

    const { rowsComputed } = useRows(columnsComputed, props)

    const { filteredRows } = useFilterable(rowsComputed, props, emit)

    const {
      sortBySync,
      sortingOrderSync,
      toggleSorting,
      sortedRows,
    } = useSortable(columnsComputed, filteredRows, props, emit)

    const { paginatedRows } = usePaginatedRows(sortedRows, props)

    const {
      ctrlSelectRow,
      shiftSelectRows,
      toggleBulkSelection,
      isRowSelected,
      severalRowsSelected,
      allRowsSelected,
    } = useSelectableRow(paginatedRows, props, emit)

    const {
      getHeaderCSSVariables,
      rowCSSVariables,
      getCellCSSVariables,
      getFooterCSSVariables,
      getStickyCSSVariables,
      getClasses,
      getStyles,
    } = useStylable(props)

    const animationName = useAnimationName(props, paginatedRows)

    const showNoDataHtml = computed(() => props.items.length === 0)

    const showNoDataFilteredHtml = computed(() => paginatedRows.value.length === 0)

    const onRowClickHandler = (name: emitNames, event: Event, row: TableRow) => {
      if (props.clickable) {
        emit(name, {
          event,
          item: row.source,
          itemIndex: row.initialIndex,
        })
      }
    }

    const componentAttributes = computed(() => ({
      ...pick(attrs, ['class', 'style']),
    }) as HTMLAttributes)

    const tableAttributes = computed(() => ({
      ...omit(attrs, ['class', 'style']),
    }) as TableHTMLAttributes)

    const getColumnAriaSortOrder = (columnKey: string) => {
      if (sortingOrderSync.value && sortBySync.value === columnKey) {
        return sortingOrderSync.value === 'asc' ? 'ascending' : 'descending'
      }

      return 'none'
    }

    return {
      columnsComputed,
      rows: paginatedRows,
      ctrlSelectRow,
      shiftSelectRows,
      toggleBulkSelection,
      isRowSelected,
      severalRowsSelected,
      allRowsSelected,
      sortBySync,
      sortingOrderSync,
      toggleSorting,
      getHeaderCSSVariables,
      rowCSSVariables,
      getCellCSSVariables,
      getFooterCSSVariables,
      getStickyCSSVariables,
      getClasses,
      getStyles,
      showNoDataHtml,
      showNoDataFilteredHtml,
      onRowClickHandler,
      componentAttributes,
      tableAttributes,
      animationName,
      getColumnAriaSortOrder,
    }
  },
})
</script>

<style lang="scss">
@import "../../styles/resources/index.scss";
@import "variables";
// The calculated variables are taken from a respective element's `style` attribute. See the `useStylable` hook

.va-data-table {
  overflow-x: auto;
  overflow-y: hidden;
  min-width: unset;
  font-family: var(--va-font-family);

  &--sticky,
  &--scroll {
    overflow-y: auto;
    height: var(--va-data-table-scroll-table-height);

    // 1) doesn't work in Firefox
    // 2) doesn't disappear on mac (the standard one does)
    // @include va-scroll(var(--scroll-table-color));
  }

  .va-data-table__table {
    width: 100%;
    cursor: default;
    white-space: nowrap;

    .va-data-table__table-thead {
      border-bottom: var(--va-data-table-thead-border);

      &--sticky {
        position: sticky;
        top: 0;
        z-index: 1;
        background-color: var(--va-data-table-scroll-table-color);
      }
    }

    .va-data-table__table-tbody {
      .no-data {
        text-align: var(--va-data-table-no-data-text-align);
        vertical-align: var(--va-data-table-no-data-vertical-align);
      }
    }

    .va-data-table__table-tfoot {
      border-top: var(--va-data-table-thead-border);
    }

    .va-data-table__table-th {
      padding: var(--va-data-table-cell-padding);
      width: var(--va-data-table-width);
      min-width: var(--va-data-table-width);
      text-align: var(--va-data-table-align);
      vertical-align: var(--va-data-table-vertical-align);
      color: var(--va-data-table-thead-color);
      font-size: var(--va-data-table-thead-font-size);
      line-height: var(--va-data-table-thead-line-height);
      font-weight: var(--va-data-table-thead-font-weight);
      text-transform: var(--va-data-table-thead-text-transform);
      letter-spacing: var(--va-data-table-thead-letter-spacing);
      cursor: var(--va-data-table-cursor);

      .va-data-table__table-th-wrapper {
        display: flex;
        align-items: center;
      }

      .va-data-table__table-th-sorting {
        justify-self: end;
        line-height: 1;
      }

      .va-data-table__table-th-sorting-icon {
        opacity: 0;
        user-select: none;
        pointer-events: none;

        &.active {
          opacity: 1;
          pointer-events: initial;
        }
      }

      span {
        flex-grow: 1;
      }

      &:hover {
        .va-data-table__table-th-sorting-icon:not(.active) {
          opacity: var(--va-data-table-hover-th-opacity);
        }
      }
    }

    .va-data-table__table-td {
      padding: var(--va-data-table-cell-padding);
      text-align: var(--va-data-table-align);
      vertical-align: var(--va-data-table-vertical-align);
    }

    .va-data-table__table-th,
    .va-data-table__table-td {
      &.va-data-table__table-cell-select {
        width: var(--va-data-table-selectable-cell-width);
        min-width: var(--va-data-table-selectable-cell-width);
        text-align: var(--va-data-table-selectable-cell-text-align);
        vertical-align: var(--va-data-table-selectable-cell-vertical-align);
        cursor: var(--va-data-table-selectable-tr-cursor);
      }
    }

    .va-data-table__table-tr {
      &.selected {
        background-color: var(--va-data-table-selected-color);
      }
    }

    &.clickable {
      .va-data-table__table-tr {
        cursor: pointer;
      }
    }

    &.striped {
      .va-data-table__table-tr {
        position: relative;
        z-index: 0;

        &:nth-child(2n) {
          &:not(.selected) {
            @include va-background(var(--va-data-table-striped-tr-background-color), var(--va-data-table-striped--tr-opacity), -1);
          }
        }
      }
    }

    &.selectable,
    &.hoverable {
      .va-data-table__table-tr {
        &:hover {
          background-color: var(--va-data-table-hover-color);
        }
      }

      .va-data-table__table-tr:nth-child(2n) {
        &:hover {
          background-color: var(--va-data-table-hover-color);

          @include va-background-opacity(transparent);
        }
      }
    }

    .table-transition-fade-leave-active {
      transition: opacity var(--va-data-table-transition);
    }

    .table-transition-fade-enter-active {
      transition: opacity var(--va-data-table-transition) 0.2s;
    }

    .table-transition-fade-enter-from,
    .table-transition-shuffle-enter-from,
    .table-transition-fade-leave-to,
    .table-transition-shuffle-leave-to {
      opacity: 0;
    }

    .table-transition-shuffle-move {
      transition: transform var(--va-data-table-transition);
    }

    .table-transition-shuffle-leave-active {
      transition: none;
    }

    .table-transition-shuffle-enter-active {
      transition: opacity var(--va-data-table-transition);
    }
  }
}
</style>
