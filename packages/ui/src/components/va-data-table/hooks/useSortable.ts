import { TableColumn } from './useColumns'
import { computed, ref, Ref, watch } from 'vue'
import { TableRow, ITableItem } from './useRows'

export type TSortingOrder = 'asc' | 'desc' | null;
export type TSortableEmits = (
  event: 'update:sortBy' | 'update:sortingOrder' | 'sorted',
  args: string | TSortingOrder | { sortBy: string, sortingOrder: TSortingOrder, sortedRows: ITableItem[] },
) => void;

export default function useSortable (
  columns: Ref<TableColumn[]>,
  rows: Ref<TableRow[]>,
  sortBy: Ref<string | undefined>,
  sortingOrder: Ref<TSortingOrder | undefined>,
  emit: TSortableEmits,
) {
  // the standard proxying approach for v-models
  const sortByFallback = ref('')
  const sortByProxy = computed<string>({
    get () {
      if (sortBy.value === undefined) {
        return sortByFallback.value
      } else {
        return sortBy.value
      }
    },

    set (value) {
      if (sortBy.value === undefined) {
        sortByFallback.value = value
      }

      emit('update:sortBy', value)
    },
  })

  const sortingOrderFallback = ref('asc' as TSortingOrder)
  const sortingOrderProxy = computed<TSortingOrder>({
    get () {
      if (sortingOrder.value === undefined) {
        return sortingOrderFallback.value
      } else {
        return sortingOrder.value
      }
    },

    set (value) {
      if (sortingOrder.value === undefined) {
        sortingOrderFallback.value = value
      }

      emit('update:sortingOrder', value)
    },
  })

  // sort each time the sortBy or sortingOrder is changed (and also initially). Also if columns definitions are changed
  // (because that potentially means that the user runtime-introduced a custom sorting function for a specific column)
  watch(
    [sortByProxy, sortingOrderProxy, columns],
    () => { sort() },
    { immediate: true },
  )

  // sorts by string-value of a given row's cell (depending on by which column the table is sorted) if no sortingFn is
  // provided. Otherwise uses that very sortingFn. If sortingOrder is `null` then restores the initial sorting order of
  // the rows.
  function sort () {
    const column = columns.value.find(column => column.key === sortByProxy.value)
    if (!column || !column.sortable) { return }

    const columnIndex = columns.value.indexOf(column)

    rows.value.sort((a, b) => {
      const firstValString = a.cells[columnIndex].value
      const secondValString = b.cells[columnIndex].value
      const firstValInitial = a.cells[columnIndex].source
      const secondValInitial = b.cells[columnIndex].source

      if (sortingOrderProxy.value === null) {
        return a.initialIndex - b.initialIndex
      } else {
        const sortingOrderRatio = sortingOrderProxy.value === 'desc' ? -1 : 1
        return typeof column.sortingFn === 'function'
          ? column.sortingFn(firstValInitial, secondValInitial) * sortingOrderRatio
          : firstValString.localeCompare(secondValString) * sortingOrderRatio
      }
    })

    const sortedRowsSource = rows.value.map(row => row.source)

    emit('sorted', {
      sortBy: sortByProxy.value,
      sortingOrder: sortingOrderProxy.value,
      sortedRows: sortedRowsSource,
    })
  }

  // a function to invoke when a heading of the table is clicked.
  // Sets the clicked heading's column as a one to sort by and toggles the sorting order from "asc" to "desc" to `null`
  // (un-sorted) if the same column is clicked again or sets sorting order to "asc" if some other column is chosen.
  function toggleSorting (column: TableColumn) {
    if (column.key === sortByProxy.value) {
      if (sortingOrderProxy.value === null) {
        sortingOrderProxy.value = 'asc'
      } else if (sortingOrderProxy.value === 'asc') {
        sortingOrderProxy.value = 'desc'
      } else {
        sortingOrderProxy.value = null
      }
    } else {
      sortByProxy.value = column.key
      sortingOrderProxy.value = 'asc'
    }
  }

  return {
    sortByProxy,
    sortingOrderProxy,
    toggleSorting,
  }
}
