<template>
  <tr class="va-data-table__table-tr">
    <th
      v-if="$props.selectable"
      scope="col"
      class="va-data-table__table-th va-data-table__table-cell-select"
    >
      <va-checkbox
        v-if="multiplySelectAvailable"
        class="va-data-table__table-cell-checkbox"
        :model-value="$props.severalRowsSelected ? 'idl' : $props.allRowsSelected"
        :aria-label="tp($props.ariaSelectAllRowsLabel)"
        :true-value="true"
        :false-value="false"
        :color="$props.selectedColor"
        indeterminate-value="idl"
        indeterminate
        @update:model-value="toggleBulkSelection"
      />
    </th>

    <th
      v-for="column in columns"
      :key="column.name"
      scope="col"
      class="va-data-table__table-th"
      :title="column.thTitle"
      :class="getClass(column.thClass)"
      :style="getColumnStyles(column)"
      v-bind="getAriaAttributes(column)"
      @click.exact="sortByColumn(column)"
      @keydown.enter.stop="sortByColumn(column)"
    >
      <div class="va-data-table__table-th-wrapper">
        <span v-if="`${slotNameComputed}(${column.name})` in $slots">
          <slot
            :name="`${slotNameComputed}(${column.name})`"
            v-bind="{ label: column.label, key: column.key }"
          />
        </span>

        <slot
          v-else
          :name="slotNameComputed"
          v-bind="{ label: column.label, key: column.key }"
        >
          <span>{{ column.label }}</span>
        </slot>

          <va-icon
            v-if="column.sortable"
            class="va-data-table__table-th-sorting-icon"
            :class="{ active: sortBySync === column.name && sortingOrderSync !== null }"
            size="small"
            :role="column.sortable ? 'button' : undefined"
            :tabindex="column.sortable ? 0 : -1"
            :name="sortingOrderIconName"
            @selectstart.prevent="() => {}"
          />
        </div>
    </th>
  </tr>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

import { VaIcon } from '../../va-icon'
import { VaCheckbox } from '../../va-checkbox'

import { useStylable, useStylableProps } from '../hooks/useStylable'

import type { TSortIcon } from '../hooks/useSortable'

import { useTranslation } from '../../../composables'

import {
  DataTableSortingOrder,
  DataTableSelectMode,
  DataTableColumnInternal,
} from '../types'

export default defineComponent({
  name: 'VaDataTableThRow',

  components: { VaIcon, VaCheckbox },

  props: {
    ...useStylableProps,
    selectMode: { type: String as PropType<DataTableSelectMode>, default: 'multiple' },
    allRowsSelected: { type: Boolean, default: false },
    severalRowsSelected: { type: Boolean, default: false },

    columns: { type: Array as PropType<DataTableColumnInternal[]>, required: true },

    isFooter: { type: Boolean, default: false },

    sortBySync: { type: String, required: true },
    sortingOrderIconName: { type: String as PropType<TSortIcon>, required: true },
    sortingOrderSync: { type: String as PropType<DataTableSortingOrder | null>, default: null },

    ariaSelectAllRowsLabel: { type: String, default: '$t:selectAllRows' },
    ariaSortColumnByLabel: { type: String, default: '$t:sortColumnBy' },
  },

  emits: [
    'toggleBulkSelection',
    'toggleSorting',
  ],

  setup (props, { emit }) {
    const { t, tp } = useTranslation()

    const {
      getFooterCSSVariables,
      getHeaderCSSVariables,
      getClass,
      getStyle,
    } = useStylable(props)

    const getAriaAttributes = (column: DataTableColumnInternal) => {
      const ariaSort = (props.sortingOrderSync && props.sortBySync === column.name
        ? props.sortingOrderSync === 'asc' ? 'ascending' : 'descending'
        : 'none') as 'none' | 'ascending' | 'descending'

      const ariaLabel = column.sortable ? tp(props.ariaSortColumnByLabel, { name: column.label }) : undefined

      return {
        'aria-sort': ariaSort,
        'aria-label': ariaLabel,
      }
    }

    const sortByColumn = (column: DataTableColumnInternal) => {
      if ((props.isFooter && !props.allowFooterSorting) || !column.sortable) { return }

      emit('toggleSorting', column)
    }

    const toggleBulkSelection = () => emit('toggleBulkSelection')

    const getColumnStyles = (column: DataTableColumnInternal) => {
      return [props.isFooter ? getFooterCSSVariables(column) : getHeaderCSSVariables(column), getStyle(column.thStyle)]
    }

    const slotNameComputed = computed(() => props.isFooter ? 'footer' : 'header')

    const multiplySelectAvailable = computed(() => props.selectMode === 'multiple')

    return {
      tp,
      getClass,
      sortByColumn,
      getColumnStyles,
      slotNameComputed,
      getAriaAttributes,
      toggleBulkSelection,
      multiplySelectAvailable,
    }
  },
})
</script>

<style lang="scss">
@import "../../../styles/resources/index.scss";
@import "../variables";

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

    @include keyboard-focus-outline($offset: 2px);
  }

  .va-data-table__table-th-sorting-icon {
    opacity: 0;
    user-select: none;
    pointer-events: none;

    &.active {
      opacity: 1;
      pointer-events: initial;
    }

    &:focus-visible {
      opacity: 1;
    }
  }

  span {
    flex-grow: 1;
  }

  &:hover {
    .va-data-table__table-th-sorting-icon:not(.active, :focus-visible) {
      opacity: var(--va-data-table-hover-th-opacity);
    }
  }
}
</style>
