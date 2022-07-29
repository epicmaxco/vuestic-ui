<template>
  <va-inner-loading
    class="va-data-table"
    aria-live="polite"
    v-bind="computedAttributes"
    :loading="loading"
    :color="loadingColor"
  >
    <table
      class="va-data-table__table"
      v-bind="computedTableAttributes"
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
            class="va-data-table__table-th va-data-table__table-cell-select"
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
            :key="column.name"
            scope="col"
            :aria-sort="getColumnAriaSortOrder(column.name)"
            :aria-label="column.sortable ? `sort column by ${column.label}` : undefined"
            :title="column.thTitle"
            class="va-data-table__table-th"
            :class="getClass(column.thClass)"
            :style="[getHeaderCSSVariables(column), getStyle(column.thStyle)]"
            @click.exact="column.sortable && toggleSorting(column)"
            @keydown.enter.stop="column.sortable && toggleSorting(column)"
          >
            <div class="va-data-table__table-th-wrapper" :tabindex="column.sortable ? 0 : -1">
              <span v-if="`header(${column.name})` in $slots">
                <slot :name="`header(${column.name})`" v-bind="{ label: column.label, key: column.key }" />
              </span>

              <slot v-else name="header" v-bind="{ label: column.label, key: column.key }">
                <span>{{ column.label }}</span>
              </slot>

              <div
                v-if="column.sortable"
                class="va-data-table__table-th-sorting"
                aria-hidden="true"
                @selectstart.prevent
              >
                <va-icon
                  :name="sortingOrderIconName"
                  size="small"
                  class="va-data-table__table-th-sorting-icon"
                  :class="{ active: sortBySync === column.name && sortingOrderSync !== null }"
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
            :class="[{ selected: isRowSelected(row) }]"
            v-bind="getRowBind(row)"
            @click="onRowClickHandler('row:click', $event, row)"
            @dblclick="onRowClickHandler('row:dblclick', $event, row)"
            @contextmenu="onRowClickHandler('row:contextmenu', $event, row)"
          >
            <td
              v-if="selectable"
              class="va-data-table__table-td va-data-table__table-cell-select"
              :key="`selectable_${row.initialIndex}`"
              @selectstart.prevent
            >
              <va-checkbox
                :model-value="isRowSelected(row)"
                :color="selectedColor"
                :aria-label="`select row ${row.initialIndex}`"
                @click.shift.exact.stop="shiftSelectRows(row)"
                @click.ctrl.exact.stop="ctrlSelectRow(row)"
                @click.exact.stop="ctrlSelectRow(row)"
              />
            </td>

            <td
              v-for="cell in row.cells"
              :key="`table-cell_${cell.column.name + cell.rowIndex}`"
              class="va-data-table__table-td"
              :class="getClass(cell.column.tdClass)"
              :style="[getCellCSSVariables(cell), getStyle(cell.column.tdStyle)]"
              v-bind="getCellBind(cell, row)"
            >
              <slot
                v-if="`cell(${cell.column.name})` in $slots"
                :name="`cell(${cell.column.name})`"
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

      <tfoot
        v-if="footerClone"
        class="va-data-table__table-tfoot"
        :class="{ 'va-data-table__table-tfoot--sticky': $props.stickyFooter }"
      >
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
            :key="column.name"
            :title="column.thTitle"
            :aria-label="allowFooterSorting && column.sortable ? `sort column by ${column.label}` : undefined"
            class="va-data-table__table-th"
            :class="getClass(column.thClass)"
            :style="[getFooterCSSVariables(column), getStyle(column.thStyle)]"
            @click.exact="allowFooterSorting && column.sortable && toggleSorting(column)"
            @keydown.enter.stop="allowFooterSorting && column.sortable && toggleSorting(column)"
          >
            <div class="va-data-table__table-th-wrapper" :tabindex="allowFooterSorting && column.sortable ? 0 : -1">
              <span v-if="`footer(${column.name})` in $slots">
                <slot :name="`footer(${column.name})`" v-bind="{ label: column.label, key: column.key }" />
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
                  :name="sortingOrderIconName"
                  size="small"
                  class="va-data-table__table-th-sorting-icon"
                  :class="{ active: sortBySync === column.name && sortingOrderSync !== null }"
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

import useColumns, { sortingOptionsValidator } from './hooks/useColumns'
import useRows from './hooks/useRows'
import useFilterable from './hooks/useFilterable'
import useSortable from './hooks/useSortable'
import usePaginatedRows from './hooks/usePaginatedRows'
import useSelectableRow from './hooks/useSelectableRow'
import useStylable from './hooks/useStylable'
import useBinding from './hooks/useBinding'
import useAnimationName from './hooks/useAnimationName'

import type {
  DataTableColumnSource,
  DataTableItem,
  DataTableRow,
  DataTableFilterMethod,
  DataTableSortingOrder,
  DataTableSortingOptions,
  DataTableSelectMode,
  DataTableRowBind,
  DataTableCellBind,
  DataTableItemKey,
} from './types'

import { VaInnerLoading } from '../va-inner-loading'
import { VaCheckbox } from '../va-checkbox'
import { VaIcon } from '../va-icon'

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
    columns: { type: Array as PropType<DataTableColumnSource[]>, default: () => [] as DataTableColumnSource[] },
    items: { type: Array as PropType<DataTableItem[]>, default: () => [] as DataTableItem[] },
    itemsTrackBy: { type: [String, Function] as PropType<string | ((item: DataTableItem) => any)>, default: '' },
    modelValue: { type: Array as PropType<(DataTableItem | DataTableItemKey)[]> }, // selectedItems
    sortingOrder: { type: String as PropType<DataTableSortingOrder> }, // model-able
    sortBy: { type: String }, // model-able
    sortingOptions: {
      type: Array as PropType<DataTableSortingOptions>,
      default: () => ['asc', 'desc', null],
      validator: sortingOptionsValidator,
    },
    filter: { type: String, default: '' },
    filterMethod: { type: Function as PropType<DataTableFilterMethod> },
    hoverable: { type: Boolean, default: false },
    clickable: { type: Boolean, default: false },
    animated: { type: Boolean, default: true },
    selectable: { type: Boolean, default: false },
    selectMode: { type: String as PropType<DataTableSelectMode>, default: 'multiple' },
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
    stickyFooter: { type: Boolean, default: false },
    height: { type: [String, Number] },
    rowBind: { type: null as unknown as PropType<DataTableRowBind> },
    cellBind: { type: null as unknown as PropType<DataTableCellBind> },
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
      sortingOrderIconName,
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
      rowCSSVariables,
      stickyCSSVariables,
      getHeaderCSSVariables,
      getCellCSSVariables,
      getFooterCSSVariables,
      getClass,
      getStyle,
    } = useStylable(props)

    const { getRowBind, getCellBind } = useBinding(props)

    const animationName = useAnimationName(props, paginatedRows)

    const showNoDataHtml = computed(() => props.items.length === 0)

    const showNoDataFilteredHtml = computed(() => paginatedRows.value.length === 0)

    const onRowClickHandler = (name: emitNames, event: Event, row: DataTableRow) => {
      if (props.clickable) {
        emit(name, {
          event,
          item: row.source,
          itemIndex: row.initialIndex,
        })
      }
    }

    const computedAttributes = computed(() => ({
      class: [
        { 'va-data-table--sticky': props.stickyHeader || props.stickyFooter },
        { 'va-data-table--scroll': !!props.height },
        attrs.class,
      ],
      style: [stickyCSSVariables.value, attrs.style],
    }) as HTMLAttributes)

    const computedTableAttributes = computed(() => ({
      ...omit(attrs, ['class', 'style']),
      class: pick(props, ['striped', 'selectable', 'hoverable', 'clickable']),
    }) as TableHTMLAttributes)

    const getColumnAriaSortOrder = (columnName: string) => sortingOrderSync.value && sortBySync.value === columnName
      ? sortingOrderSync.value === 'asc' ? 'ascending' : 'descending'
      : 'none'

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
      sortingOrderIconName,
      rowCSSVariables,
      getHeaderCSSVariables,
      getCellCSSVariables,
      getFooterCSSVariables,
      getClass,
      getStyle,
      showNoDataHtml,
      showNoDataFilteredHtml,
      onRowClickHandler,
      computedAttributes,
      computedTableAttributes,
      animationName,
      getColumnAriaSortOrder,
      getRowBind,
      getCellBind,
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
      color: var(--va-data-table-thead-color);

      th {
        border-bottom: none;
        box-shadow: var(--va-data-table-thead-border-bottom-shadow);
      }

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
      color: var(--va-data-table-thead-color);

      th {
        border-bottom: none;
        box-shadow: var(--va-data-table-thead-border-top-shadow);
      }

      &--sticky {
        position: sticky;
        bottom: 0;
        z-index: 1;
        background-color: var(--va-data-table-scroll-table-color);
      }
    }

    .va-data-table__table-th {
      padding: var(--va-data-table-cell-padding);
      width: var(--va-data-table-width);
      min-width: var(--va-data-table-width);
      text-align: var(--va-data-table-align);
      vertical-align: var(--va-data-table-vertical-align);
      font-size: var(--va-data-table-thead-font-size);
      line-height: var(--va-data-table-thead-line-height);
      font-weight: var(--va-data-table-thead-font-weight);
      text-transform: var(--va-data-table-thead-text-transform);
      letter-spacing: var(--va-data-table-thead-letter-spacing);
      cursor: var(--va-data-table-cursor);

      .va-data-table__table-th-wrapper {
        display: flex;
        align-items: center;

        &:focus {
          @include focus-outline($offset: 2px);
        }
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
