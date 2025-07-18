<template>
  <va-virtual-scroller
    class="va-data-table"
    v-bind="computedAttributes"
    ref="scrollContainer"
  >
    <template #content="{
        uniqueKey,
        renderBuffer,
        currentListOffset,
        listStyleComputed,
        containerStyleComputed,
      }">
      <va-inner-loading
        aria-live="polite"
        :style="containerStyleComputed"
        :loading="loading"
        :color="loadingColor"
      >
        <div
          v-if="doRenderTopTrigger"
          ref="topTrigger"
          class="va-data-table__scroll-trigger"
        />

        <table
          class="va-data-table__table"
          :style="listStyleComputed"
          v-bind="computedTableAttributes"
        >

          <colgroup v-if="'colgroup' in $slots">
            <slot name="colgroup" v-bind="columnsComputed" />
          </colgroup>

          <thead
            class="va-data-table__table-thead"
            :class="{ 'va-data-table__table-thead--sticky': $props.stickyHeader }"
            :style="{ top: isVirtualScroll && $props.stickyHeader ? `-${currentListOffset}px` : undefined }"
          >

            <slot name="headerPrepend" />

            <slot name="header">
              <va-data-table-th-row
                v-if="!hideDefaultHeader"
                v-bind="thAttributesComputed"
                v-on:toggleBulkSelection="toggleBulkSelection"
                v-on:toggleSorting="toggleSorting"
              >
                <template v-for="(_, slot) of $slots" v-slot:[slot]="scope">
                  <slot :name="slot" v-bind="scope" />
                </template>
              </va-data-table-th-row>
            </slot>

            <slot name="headerAppend" />
          </thead>

          <tbody
            ref="list"
            class="va-data-table__table-tbody"
          >
            <slot name="bodyPrepend" />

            <transition-group
              :name="isVirtualScroll ? '' : animationName"
              :css="!$props.virtualScroller"
              :appear="!$props.virtualScroller"
            >
              <tr
                v-if="showNoDataHtml"
                key="showNoDataHtml"
                class="va-data-table__table-tr"
              >
                <td
                  class="va-data-table__table-td no-data"
                  colspan="99999"
                >
                  <slot name="no-data">
                    <div v-html="noDataHtml" />
                  </slot>
                </td>
              </tr>

              <tr
                v-else-if="showNoDataFilteredHtml"
                key="showNoDataFilteredHtml"
                class="va-data-table__table-tr"
              >
                <td
                  class="va-data-table__table-td no-data"
                  colspan="99999"
                >
                  <slot name="no-filtered-data">
                    <slot name="no-data">
                      <div v-html="noDataFilteredHtml" />
                    </slot>
                  </slot>
                </td>
              </tr>

              <template
                v-for="(row, index) in renderBuffer"
                :key="`table-row_${uniqueKey(row, index)}`"
              >
                <slot name="row" v-bind="row">
                  <tr
                    class="va-data-table__table-tr"
                    :class="[{ selected: isRowSelected(row), 'va-data-table__table-tr--expanded': row.isExpandableRowVisible }]"
                    v-bind="getRowBind(row)"
                    @click="onRowClickHandler('row:click', $event, row)"
                    @dblclick="onRowClickHandler('row:dblclick', $event, row)"
                    @contextmenu="onRowClickHandler('row:contextmenu', $event, row)"
                  >
                    <td
                      v-if="selectable && !$props.grid"
                      class="va-data-table__table-td va-data-table__table-cell-select"
                      :key="`selectable_${uniqueKey(row, index)}`"
                      @selectstart.prevent
                    >
                      <va-checkbox
                        class="va-data-table__table-cell-checkbox"
                        :model-value="isRowSelected(row)"
                        :color="selectedColor"
                        :aria-label="tp($props.ariaSelectRowLabel, { index: row.initialIndex })"
                        @click.shift.exact.stop="shiftSelectRows(row)"
                        @click.ctrl.exact.stop="ctrlSelectRow(row)"
                        @click.exact.stop="ctrlSelectRow(row)"
                      />
                    </td>

                    <td
                      v-for="(cell, cellIndex) in row.cells"
                      :key="`table-cell_${cell.column.name + cell.rowIndex}`"
                      class="va-data-table__table-td"
                      :class="getClass(cell.column.tdClass)"
                      :style="[
                        cell.column.width ? { minWidth: cell.column.width, maxWidth: cell.column.width } : {},
                        getCellCSSVariables(cell),
                        getStyle(cell.column.tdStyle),
                      ]"
                      v-bind="getCellBind(cell, row)"
                    >
                      <slot
                        v-if="`cell(${cell.column.name})` in $slots"
                        :name="`cell(${cell.column.name})`"
                        v-bind="{ ...cell, row, isExpanded: row.isExpandableRowVisible }"
                      />

                      <slot v-else name="cell" v-bind="{ cell, row }">
                        <span v-if="$props.grid" class="va-data-table__grid-column-header">{{ columnsComputed[cellIndex].label }}</span>
                        {{ cellData(cell, columnsComputed[cellIndex]) }}
                      </slot>
                    </td>
                  </tr>
                </slot>
                <tr v-if="row.isExpandableRowVisible" class="va-data-table__table-tr" :key="`table-expandable-row_${uniqueKey(row, index)}`">
                  <td
                    class="va-data-table__table-expanded-content"
                    colspan="100%"
                  >
                    <slot
                      name="expandableRow"
                      v-bind="row"
                    />
                  </td>
                </tr>
              </template>
            </transition-group>

            <slot name="bodyAppend" />
          </tbody>

          <tfoot
            v-if="['footer', 'footerPrepend', 'footerAppend'].some(field => $slots[field]) || (footerClone && !$props.grid)"
            class="va-data-table__table-tfoot"
            :class="{ 'va-data-table__table-tfoot--sticky': $props.stickyFooter }"
            :style="{ bottom: isVirtualScroll && $props.stickyFooter ? `${currentListOffset}px` : undefined }"
          >
            <slot name="footerPrepend" />

            <slot name="footer">
              <va-data-table-th-row
                v-if="!hideDefaultHeader"
                v-bind="thAttributesComputed"
                is-footer
                v-on:toggleBulkSelection="toggleBulkSelection"
                v-on:toggleSorting="toggleSorting"
              >
                <template v-for="(_, slot) of $slots" v-slot:[slot]="scope">
                  <slot :name="slot" v-bind="scope" />
                </template>
              </va-data-table-th-row>
            </slot>

            <slot name="footerAppend" />
          </tfoot>
        </table>

        <div
          v-if="doRenderBottomTrigger"
          ref="bottomTrigger"
          class="va-data-table__scroll-trigger"
        />
      </va-inner-loading>
    </template>
  </va-virtual-scroller>
</template>

<script lang="ts">
import { PropType, computed, TableHTMLAttributes, StyleValue, useAttrs } from 'vue'

import { useColumns, useColumnsProps } from './hooks/useColumns'
import { usePaginatedRows, usePaginatedRowsProps } from './hooks/usePaginatedRows'
import { useSelectableRow, useSelectableProps } from './hooks/useSelectableRow'
import { useStylable, useStylableProps } from './hooks/useStylable'
import { useBinding, useBindingProps } from './hooks/useBinding'
import { useAnimationName, useAnimationNameProps } from './hooks/useAnimationName'
import { useRows, createRowsProps } from './hooks/useRows'
import { useFilterable, useFilterableProps } from './hooks/useFilterable'
import { useSortable, useSortableProps } from './hooks/useSortable'
import { useTableScroll, useTableScrollProps, useTableScrollEmits } from './hooks/useTableScroll'

import { useComponentPresetProp, useTranslation, useTranslationProp } from '../../composables'

import { extractComponentProps, filterComponentProps } from '../../utils/component-options'

import type { DataTableCell, DataTableColumnInternal, DataTableRow } from './types'

import { VaDataTableThRow } from './components'
import { VaVirtualScroller } from '../va-virtual-scroller'
import { VaInnerLoading } from '../va-inner-loading'
import { VaCheckbox } from '../va-checkbox'
import { pick } from '../../utils/pick'
import { omit } from '../../utils/omit'

const VaVirtualScrollerProps = extractComponentProps(VaVirtualScroller, ['items', 'trackBy', 'horizontal', 'disabled', 'table'])
const VaDataTableThRowProps = extractComponentProps(VaDataTableThRow)

type emitNames = 'update:modelValue' |
  'update:sortBy' |
  'update:sortingOrder' |
  'columnSorted' |
  'filtered' |
  'sorted' |
  'selectionChange' |
  'row:click' |
  'row:dblclick' |
  'row:contextmenu' |
  'scroll:top' |
  'scroll:bottom'
</script>

<script lang="ts" generic="Item extends Record<string, any>" setup>

const { tp } = useTranslation()

defineOptions({
  name: 'VaDataTable',
  inheritAttrs: false,
})

const props = defineProps({
  ...useComponentPresetProp,
  ...VaVirtualScrollerProps,
  ...useAnimationNameProps,
  ...useBindingProps,
  ...useTableScrollProps,
  ...useSortableProps,
  ...useStylableProps,
  ...useColumnsProps,
  ...useFilterableProps,
  ...usePaginatedRowsProps,
  ...createRowsProps<Item>(),
  ...useSelectableProps,
  ...pick(VaDataTableThRowProps, ['ariaSelectAllRowsLabel', 'ariaSortColumnByLabel']),
  hoverable: { type: Boolean, default: false },
  clickable: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  loadingColor: { type: String, default: 'primary' },
  noDataHtml: { type: String, default: 'No items' },
  noDataFilteredHtml: { type: String, default: 'No items match the provided filtering condition' },
  hideDefaultHeader: { type: Boolean, default: false },
  footerClone: { type: Boolean, default: false },
  striped: { type: Boolean, default: false },
  virtualScroller: { type: Boolean, default: false },
  virtualTrackBy: { type: [String, Number] as PropType<string | number>, default: 'initialIndex' },
  grid: { type: Boolean, default: false },
  gridColumns: { type: [Number, String], default: 0 },
  wrapperSize: { type: [Number, String] as PropType<number | string | 'auto'>, default: 'auto' },

  ariaSelectRowLabel: useTranslationProp('$t:selectRowByIndex'),

  delay: { type: [Number, String], default: 0 },

  expanded: {
    type: Array as PropType<boolean[]>,
    default: () => [],
  },
})

const emit = defineEmits([
  'update:modelValue', // `modelValue` is selectedItems
  'update:sortBy',
  'update:sortingOrder',
  'update:expanded',
  'filtered',
  'sorted',
  'selectionChange',
  'row:click',
  'row:dblclick',
  'row:contextmenu',
  'columnSorted',
  ...useTableScrollEmits,
])

const { columnsComputed } = useColumns(props)

const { rowsComputed } = useRows(columnsComputed, props, emit)

const { filteredRows } = useFilterable(rowsComputed, props, emit)

const {
  sortBySync,
  sortingOrderSync,
  toggleSorting,
  sortedRows,
  sortingOrderIconName,
} = useSortable(columnsComputed, filteredRows, props, emit)

const { paginatedRows } = usePaginatedRows<Item>(sortedRows, props)

const {
  ctrlSelectRow,
  shiftSelectRows,
  toggleBulkSelection,
  isRowSelected,
  severalRowsSelected,
  allRowsSelected,
  toggleRowSelection,
} = useSelectableRow(paginatedRows, props, emit)

const {
  CSSVariables,
  getCellCSSVariables,
  getClass,
  getStyle,
} = useStylable(props)

const { getRowBind, getCellBind } = useBinding(props)

const animationName = useAnimationName(props, paginatedRows)

const showNoDataHtml = computed(() => props.items.length === 0)

const showNoDataFilteredHtml = computed(() => paginatedRows.value.length === 0)

const onRowClickHandler = (name: emitNames, event: Event, row: DataTableRow) => {
  emit(name, {
    event,
    item: row.source,
    itemIndex: row.initialIndex,
    row,
  })

  if (props.selectable && props.grid) {
    toggleRowSelection(row)
  }
}

const computedTableAttributes = computed(() => (({
  ...omit(attrs, ['class', 'style']),
  class: pick(props, ['striped', 'selectable', 'hoverable', 'clickable']),
}) as TableHTMLAttributes))

const filteredVirtualScrollerProps = filterComponentProps(VaVirtualScrollerProps)
const virtualScrollerPropsComputed = computed(() => ({
  ...filteredVirtualScrollerProps.value,
  items: paginatedRows.value,
  trackBy: props.virtualTrackBy,
  disabled: !props.virtualScroller,
  table: true,
}))

const attrs = useAttrs()
const computedAttributes = computed(() => ({
  class: [
    { 'va-data-table--sticky': props.stickyHeader || props.stickyFooter },
    { 'va-data-table--scroll': !!props.height },
    { 'va-data-table--virtual-scroller': isVirtualScroll.value },
    { 'va-data-table--grid': props.grid },
    attrs.class as string[],
  ],
  style: [attrs.style as StyleValue],
  ...virtualScrollerPropsComputed.value,
}))

const filteredThProps = filterComponentProps(VaDataTableThRowProps)
const thAttributesComputed = computed(() => ({
  ...filteredThProps.value,
  columns: columnsComputed.value,
  sortingOrderIconName: sortingOrderIconName.value,
  severalRowsSelected: severalRowsSelected.value,
  sortingOrderSync: sortingOrderSync.value,
  allRowsSelected: allRowsSelected.value,
  sortBySync: sortBySync.value,
}))

const {
  scrollContainer,
  topTrigger,
  bottomTrigger,
  doRenderTopTrigger,
  doRenderBottomTrigger,
} = useTableScroll(props, emit)

const isVirtualScroll = computed(() => props.virtualScroller && !props.grid)

const gridColumnsCount = computed(() => props.gridColumns || 'var(--va-data-table-grid-tbody-columns)')

const cellData = (cellData: DataTableCell, internalColumnData: DataTableColumnInternal) => internalColumnData.displayFormatFn ? internalColumnData.displayFormatFn(cellData.value) : cellData.value
</script>

<style lang="scss">
@import "../../styles/resources/index.scss";
@import "variables";

.va-data-table {
  // we set variables below via the `useStylable` hook
  --va-data-table-selected-color: v-bind('CSSVariables.selectedColor');
  --va-data-table-hover-color: v-bind('CSSVariables.hoverColor');
  --va-data-table-height--computed: v-bind('CSSVariables.tableHeight');
  --va-data-table-thead-background--computed: v-bind('CSSVariables.theadBg');
  --va-data-table-tfoot-background--computed: v-bind('CSSVariables.tfootBg');
  --va-data-table-grid-tbody-columns: 4;

  @include media-breakpoint-down(lg) {
    --va-data-table-grid-tbody-columns: 3;
  }

  @include media-breakpoint-down(md) {
    --va-data-table-grid-tbody-columns: 2;
  }

  @include media-breakpoint-down(sm) {
    --va-data-table-grid-tbody-columns: 1;
  }

  min-width: unset;
  font-family: var(--va-font-family);

  &:not(.va-data-table--virtual-scroller) {
    overflow-x: auto;
    overflow-y: hidden;
  }

  &--sticky:not(.va-data-table--virtual-scroller),
  &--scroll {
    overflow-y: auto;
    height: var(--va-data-table-height--computed);
    max-height: var(--va-data-table-max-height);
  }

  .va-data-table__table {
    width: 100%;
    cursor: default;
    white-space: nowrap;

    .va-data-table__table-thead {
      color: var(--va-data-table-thead-color);
      border-bottom: var(--va-data-table-thead-border);

      th {
        border-bottom: none;
      }

      &--sticky {
        position: sticky;
        top: 0;
        z-index: 1;
        background: var(--va-data-table-thead-background--computed);
      }
    }

    .va-data-table__table-tbody {
      .no-data {
        text-align: var(--va-data-table-no-data-text-align);
        vertical-align: var(--va-data-table-no-data-vertical-align);
        width: 100%;
      }
    }

    .va-data-table__table-tfoot {
      color: var(--va-data-table-tfoot-color);
      border-top: var(--va-data-table-tfoot-border, var(--va-data-table-thead-border));

      th {
        border-bottom: none;
      }

      &--sticky {
        position: sticky;
        bottom: 0;
        z-index: 1;
        background: var(--va-data-table-tfoot-background--computed);
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

      & .va-data-table__table-cell-checkbox {
        display: block;
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
      .va-data-table__table-tbody {
        .va-data-table__table-tr {
          &:nth-of-type(2n) {
            &:not(.selected) {
              td {
                // Position relative doesn't work on tr in Safari
                position: relative;
                background: var(--va-data-table-striped-tr-background-color);
                opacity: var(--va-data-table-striped-tr-opacity);
              }
            }
          }
        }
      }
    }

    &.selectable,
    &.hoverable {
      .va-data-table__table-tbody {
        .va-data-table__table-tr {
          td {
            // Position relative doesn't work on Safari on <tr> elements, only on TD.
            position: relative;
          }

          &:hover {
            td {
              @include va-background(var(--va-data-table-hover-color), 1, -1);
            }
          }
        }
      }
    }

    .table-transition-fade-leave-active {
      transition: opacity var(--va-data-table-transition);
      display: none;
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
      display: none;
    }

    .table-transition-shuffle-enter-active {
      transition: opacity var(--va-data-table-transition);
    }
  }

  &__scroll-trigger {
    user-select: none;
  }

  &--grid {
    .va-data-table__table-thead {
      .va-data-table__table-tr {
        display: flex;
        justify-content: space-between;

        .va-data-table__table-th {
          box-shadow: none;
        }

        @include media-breakpoint-down(sm) {
          flex-direction: column;
        }
      }
    }

    .va-data-table__table-tbody {
      margin-top: var(--va-data-table-grid-tbody-margin-top);
      display: grid;
      grid-template-columns: repeat(v-bind(gridColumnsCount), minmax(0, 1fr));
      gap: var(--va-data-table-grid-tbody-gap);

      .va-data-table__table-tr {
        grid-column: span 1 / span 1;
        padding: var(--va-data-table-grid-tr-padding);
        display: flex;
        flex-direction: column;
        border: var(--va-data-table-grid-tr-border);
        border-radius: var(--va-data-table-grid-tr-border-radius);
      }

      .va-data-table__table-td {
        overflow: hidden;
      }
    }

    .selectable {
      .va-data-table__table-tr {
        cursor: pointer;
      }
    }

    .va-data-table__table-td {
      display: flex;
      flex-direction: column;
    }

    .va-data-table__grid-column-header {
      font-weight: var(--va-data-table-grid-tr-header-font-weight);
      color: var(--va-data-table-grid-tr-header-color);
    }
  }
}
</style>
