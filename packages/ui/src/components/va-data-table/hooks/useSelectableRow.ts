import { Ref, computed, watch, ref } from 'vue'
import { TableRow, ITableItem } from './useRows'

export type TSelectMode = 'single' | 'multiple'
export type TEmits = 'update:modelValue' | 'selectionChange'
export type TSelectionChange = {
  currentSelectedItems: ITableItem[],
  previousSelectedItems: ITableItem[],
}
export type TSelectableEmits = (event: TEmits, arg: ITableItem[] | TSelectionChange) => void

export default function useSelectableRow (
  sortedRows: Ref<TableRow[]>,
  selectedItems: Ref<ITableItem[] | undefined>,
  selectable: Ref<boolean>,
  selectMode: Ref<TSelectMode>,
  emit: TSelectableEmits,
) {
  const selectedItemsFallback = ref([] as ITableItem[])
  const selectedItemsProxy = computed<ITableItem[]>({
    get () {
      if (selectedItems.value === undefined) {
        return selectedItemsFallback.value
      } else {
        return selectedItems.value
      }
    },

    set (modelValue) {
      if (selectedItems.value === undefined) {
        selectedItemsFallback.value = modelValue
      }

      emit('update:modelValue', modelValue)
    },
  })

  const prevSelectedRowIndex = ref(-1)

  // clear all the selected rows when the `select-mode`'s value changes from multiple to single
  // (though it's safe enough to leave a selected item when changing from single to multiple
  watch(selectMode, (newSelectMode, oldSelectMode) => {
    if (newSelectMode === 'single' && oldSelectMode === 'multiple') {
      unselectAllRows()
      setPrevSelectedRowIndex(-1)
    }
  })

  // watch for rows changes (happens when filtering is applied e.g.) and deselect all the rows that don't exist anymore
  watch(sortedRows, (newSortedRows, oldSortedRows) => {
    setPrevSelectedRowIndex(-1)

    const removedRowsSource = oldSortedRows
      .filter(oldRow => !newSortedRows.includes(oldRow))
      .map(row => row.source)

    if (!removedRowsSource.length) {
      return
    }

    selectedItemsProxy.value = selectedItemsProxy.value.filter(row => !removedRowsSource.includes(row))
  })

  // emit the "selection-change" event each time the selection changes
  watch(selectedItemsProxy, (currentSelectedItems, previousSelectedItems) => {
    emit('selectionChange', {
      currentSelectedItems,
      previousSelectedItems,
    })
  })

  // exposed
  const noRowsSelected = computed(() => {
    return selectedItemsProxy.value.length === 0
  })

  // exposed
  const severalRowsSelected = computed(() => {
    return selectedItemsProxy.value.length > 0 && selectedItemsProxy.value.length < sortedRows.value.length
  })

  // exposed
  const allRowsSelected = computed(() => {
    if (sortedRows.value.length === 0) {
      return false
    }

    return selectedItemsProxy.value.length === sortedRows.value.length
  })

  // exposed
  function isRowSelected (row: TableRow) {
    return selectedItemsProxy.value.includes(row.source)
  }

  // private
  function selectAllRows () {
    selectedItemsProxy.value = sortedRows.value.map(row => row.source)
  }

  // private
  function unselectAllRows () {
    selectedItemsProxy.value = []
  }

  // private. The one calling this function must guarantee that the row isn't already selected
  function selectRow (row: TableRow) {
    selectedItemsProxy.value = [...selectedItemsProxy.value, row.source]
  }

  // private
  function selectOnlyRow (row: TableRow) {
    selectedItemsProxy.value = [row.source]
  }

  // private. The one calling this function must guarantee that the row is selected
  function unselectRow (row: TableRow) {
    const index = selectedItemsProxy.value.findIndex(selectedItem => selectedItem === row.source)

    selectedItemsProxy.value = [
      ...selectedItemsProxy.value.slice(0, index),
      ...selectedItemsProxy.value.slice(index + 1),
    ]
  }

  // private
  function setPrevSelectedRowIndex (rowInitialIndex: number) {
    if (rowInitialIndex === -1) {
      prevSelectedRowIndex.value = -1
    } else {
      const prevSelectedRow = sortedRows.value.find(row => row.initialIndex === rowInitialIndex)

      prevSelectedRow
        ? prevSelectedRowIndex.value = sortedRows.value.indexOf(prevSelectedRow)
        : prevSelectedRowIndex.value = -1
    }
  }

  // private
  function getRowsToSelect (targetIndex: number) {
    let start
    let end

    if (isRowSelected(sortedRows.value[prevSelectedRowIndex.value])) {
      start = Math.min(prevSelectedRowIndex.value, targetIndex)
      end = Math.max(prevSelectedRowIndex.value, targetIndex)
    } else {
      start = Math.min(prevSelectedRowIndex.value + 1, targetIndex)
      end = Math.max(prevSelectedRowIndex.value - 1, targetIndex)
    }

    return sortedRows.value.slice(start, end + 1)
  }

  // private
  function mergeSelection (rowsToSelect: TableRow[]) {
    const rowsToSelectSource = rowsToSelect.map(row => row.source)

    if (noRowsSelected.value) {
      selectedItemsProxy.value = rowsToSelectSource
      return
    }

    const isInternalSelection = rowsToSelectSource.every(rowSource => selectedItemsProxy.value.includes(rowSource))

    if (isInternalSelection) {
      selectedItemsProxy.value = selectedItemsProxy.value.filter(row => !rowsToSelectSource.includes(row))
      return
    }

    selectedItemsProxy.value = [
      ...new Set([
        ...selectedItemsProxy.value,
        ...rowsToSelectSource,
      ]),
    ]
  }

  // exposed
  function toggleRowSelection (row: TableRow) {
    if (!selectable.value) {
      return
    }

    if (isRowSelected(row)) {
      unselectRow(row)
      selectMode.value === 'single' ? setPrevSelectedRowIndex(-1) : setPrevSelectedRowIndex(row.initialIndex)
    } else {
      selectMode.value === 'single' ? selectOnlyRow(row) : selectRow(row)
      setPrevSelectedRowIndex(row.initialIndex)
    }
  }

  // exposed
  function ctrlSelectRow (row: TableRow) {
    if (!selectable.value) {
      return
    }

    toggleRowSelection(row)
  }

  // exposed
  function shiftSelectRows (row: TableRow) {
    if (!selectable.value) {
      return
    }

    if (selectMode.value === 'single' || prevSelectedRowIndex.value === -1) {
      return toggleRowSelection(row)
    }

    const targetIndex = sortedRows.value.indexOf(row)
    mergeSelection(getRowsToSelect(targetIndex))
    setPrevSelectedRowIndex(-1)
  }

  // exposed
  function toggleBulkSelection () {
    if (allRowsSelected.value) {
      unselectAllRows()
    } else {
      selectAllRows()
    }

    setPrevSelectedRowIndex(-1)
  }

  return {
    ctrlSelectRow,
    shiftSelectRows,
    toggleRowSelection,
    toggleBulkSelection,
    isRowSelected,
    noRowsSelected,
    severalRowsSelected,
    allRowsSelected,
  }
}
