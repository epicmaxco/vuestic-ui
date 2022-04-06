import { computed, ref, Ref, watch } from 'vue'
import { TableColumn, TableRow, ITableItem, TSortingOrder } from '../types'

interface useSortableProps {
  sortBy: string | undefined
  sortingOrder: TSortingOrder | undefined
  [prop: string]: unknown
}
export type TSortedArgs = { sortBy: string, sortingOrder: TSortingOrder, items: ITableItem[], itemsIndexes: number[] }
export type TSortableEmits = (
  event: 'update:sortBy' | 'update:sortingOrder' | 'sorted',
  args: string | TSortingOrder | TSortedArgs,
) => void

export default function useSortable (
  columns: Ref<TableColumn[]>,
  filteredRows: Ref<TableRow[]>,
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

  const sortingOrderFallback = ref(null as TSortingOrder)
  const sortingOrderSync = computed<TSortingOrder>({
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

    const column = columns.value.find(column => column.key === sortBySync.value)

    if (!column || !column.sortable) {
      return filteredRows.value
    }

    const columnIndex = columns.value.indexOf(column)

    return [...filteredRows.value].sort((a, b) => {
      const firstValString = a.cells[columnIndex].value
      const secondValString = b.cells[columnIndex].value
      const firstValInitial = a.cells[columnIndex].source
      const secondValInitial = b.cells[columnIndex].source

      if (sortingOrderSync.value === null) {
        return a.initialIndex - b.initialIndex
      } else {
        const sortingOrderRatio = sortingOrderSync.value === 'desc' ? -1 : 1

        return sortingOrderRatio * (
          typeof column.sortingFn === 'function'
            ? column.sortingFn(firstValInitial, secondValInitial)
            : firstValString.localeCompare(secondValString)
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

  // a function to invoke when a heading of the table is clicked.
  // Sets the clicked heading's column as a one to sort by and toggles the sorting order from "asc" to "desc" to `null`
  // (un-sorted) if the same column is clicked again or sets sorting order to "asc" if some other column is chosen.
  function toggleSorting (column: TableColumn) {
    if (column.key === sortBySync.value) {
      if (sortingOrderSync.value === null) {
        sortingOrderSync.value = 'asc'
      } else if (sortingOrderSync.value === 'asc') {
        sortingOrderSync.value = 'desc'
      } else {
        sortingOrderSync.value = null
      }
    } else {
      sortBySync.value = column.key
      sortingOrderSync.value = 'asc'
    }
  }

  return {
    sortBySync,
    sortingOrderSync,
    toggleSorting,
    sortedRows,
  }
}
