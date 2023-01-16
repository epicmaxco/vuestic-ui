import { computed, ref, Ref, watch } from 'vue'

import type {
  DataTableColumnInternal,
  DataTableRow,
  DataTableItem,
  DataTableSortingOrder,
  DataTableSortingOptions,
} from '../types'

interface useSortableProps {
  sortBy: string | undefined
  sortingOrder: DataTableSortingOrder | undefined
}
export type TSortedArgs = { sortBy: string, sortingOrder: DataTableSortingOrder, items: DataTableItem[], itemsIndexes: number[] }
export type TSortableEmits = (
  event: 'update:sortBy' | 'update:sortingOrder' | 'sorted',
  args: string | DataTableSortingOrder | TSortedArgs,
) => void

export default function useSortable (
  columns: Ref<DataTableColumnInternal[]>,
  filteredRows: Ref<DataTableRow[]>,
  props: useSortableProps,
  emit: TSortableEmits,
) {
  const sortByFallback = ref('')
  const sortBySync = computed<string>({
    get () {
      if (props.sortBy === undefined) {
        return sortByFallback.value
      } else {
        return props.sortBy
      }
    },

    set (value) {
      if (props.sortBy === undefined) {
        sortByFallback.value = value
      }

      emit('update:sortBy', value)
    },
  })

  const sortingOrderFallback = ref(null as DataTableSortingOrder)
  const sortingOrderSync = computed<DataTableSortingOrder>({
    get () {
      if (props.sortingOrder === undefined) {
        return sortingOrderFallback.value
      } else {
        return props.sortingOrder
      }
    },

    set (value) {
      if (props.sortingOrder === undefined) {
        sortingOrderFallback.value = value
      }

      emit('update:sortingOrder', value)
    },
  })

  // sorts by string-value of a given row's cell (depending on by which column the table is sorted) if no sortingFn is
  // provided. Otherwise uses that very sortingFn. If sortingOrder is `null` then restores the initial sorting order of
  // the rows.
  const sortedRows = computed(() => {
    if (filteredRows.value.length <= 1) {
      return filteredRows.value
    }

    const columnIndex = columns.value.findIndex(
      ({ name, sortable }) => sortBySync.value === name && sortable,
    )
    const column = columns.value[columnIndex]

    if (!column) {
      return filteredRows.value
    }

    const sortingOrderRatio = sortingOrderSync.value === 'desc' ? -1 : 1

    return [...filteredRows.value].sort((a, b) => {
      if (sortingOrderSync.value === null) {
        return a.initialIndex - b.initialIndex
      } else {
        const firstValue = a.cells[columnIndex].value
        const secondValue = b.cells[columnIndex].value
        const firstSource = a.cells[columnIndex].source
        const secondSource = b.cells[columnIndex].source

        return sortingOrderRatio * (
          typeof column.sortingFn === 'function'
            ? column.sortingFn(firstSource, secondSource)
            : firstValue.localeCompare(secondValue)
        )
      }
    })
  })

  // sort each time the sortBy or sortingOrder is changed (and also initially). Also if columns definitions are changed
  // (because that potentially means that the user runtime-introduced a custom sorting function for a specific column)
  watch(sortedRows, () => {
    emit('sorted', {
      sortBy: sortBySync.value,
      sortingOrder: sortingOrderSync.value,
      items: sortedRows.value.map(row => row.source),
      itemsIndexes: sortedRows.value.map(row => row.initialIndex),
    })
  })

  const getNextSortingOptionsValue = (value: DataTableSortingOrder, options: DataTableSortingOptions) => {
    const index = options.findIndex((sortingValue) => sortingValue === value)

    return index !== -1
      ? options[(index + 1) % options.length]
      : options[0]
  }

  // a function to invoke when a heading of the table is clicked.
  // Sets the clicked heading's column as a one to sort by and toggles the sorting order from "asc" to "desc" to `null`
  // (un-sorted) if the same column is clicked again or sets sorting order to "asc" if some other column is chosen.
  function toggleSorting (column: DataTableColumnInternal) {
    if (column.name === sortBySync.value) {
      sortingOrderSync.value = getNextSortingOptionsValue(sortingOrderSync.value, column.sortingOptions)
    } else {
      sortBySync.value = column.name
      sortingOrderSync.value = column.sortingOptions[0]
    }
  }

  const sortingOrderIconName = computed(() => {
    return sortingOrderSync.value === 'asc'
      ? 'va-arrow-up'
      : sortingOrderSync.value === 'desc'
        ? 'va-arrow-down'
        : 'unfold_more'
  })

  return {
    sortBySync,
    sortingOrderSync,
    toggleSorting,
    sortedRows,
    sortingOrderIconName,
  }
}
