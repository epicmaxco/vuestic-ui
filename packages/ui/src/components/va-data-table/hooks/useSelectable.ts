import { Ref, computed, watch, ref } from 'vue'
import { TableRow, ITableItem } from './useRows'

// the available options for the `select-mode` prop
export type TSelectMode = 'single' | 'multiple';
export type TSelectableEmits = (
  event: 'update:modelValue' | 'selectionChange',
  arg: ITableItem[] | { currentlySelectedItems: ITableItem[], previouslySelectedItems: ITableItem[] }
) => void;

export default function useSelectable (
  rows: Ref<TableRow[]>,
  selectedItems: Ref<ITableItem[] | undefined>,
  selectable: Ref<boolean>,
  selectMode: Ref<TSelectMode>,
  emit: TSelectableEmits,
) {
  const selectedItemsFallback = ref([] as ITableItem[])

  // the standard proxying approach to work with modeled data
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

  // clear all the selected rows when the `select-mode`'s value changes from multiple to single (though it's safe enough
  // to leave a selected item when changing from single to multiple
  watch(selectMode, (newSelectMode, oldSelectMode) => {
    if (newSelectMode === 'single' && oldSelectMode === 'multiple') {
      unselectAllRows()
    }
  })

  // watch for rows changes (happens when filtering is applied e.g.) and deselect all the rows that don't exist anymore
  watch(rows, (newRows, oldRows) => {
    const removedRows = oldRows.filter(oldRow => !newRows.includes(oldRow))
    removedRows.forEach(row => {
      if (isRowSelected(row)) {
        unselectRow(row)
      }
    })
  })

  // private. The one calling this function must guarantee that the row isn't already selected
  function selectRow (row: TableRow) {
    selectedItemsProxy.value.push(row.source)
  }

  // private. The one calling this function must guarantee that the row is selected
  function unselectRow (row: TableRow) {
    selectedItemsProxy.value.splice(selectedItemsProxy.value.findIndex(item => item === row.source), 1)
  }

  // exposed
  function toggleRowSelection (row: TableRow) {
    if (!selectable.value) {
      return
    }

    if (isRowSelected(row) && selectedItemsProxy.value.length === 1) {
      unselectRow(row)
    } else {
      unselectAllRows()
      selectRow(row)
    }

    prevSelectedRowIndex.value = rows.value.indexOf(row)
    prevShiftSelectedRows.value.splice(0, prevShiftSelectedRows.value.length)
  }

  const prevSelectedRowIndex = ref(0)
  const prevShiftSelectedRows = ref<TableRow[]>([])

  function ctrlSelectRow (row: TableRow) {
    if (!selectable.value) {
      return
    }

    if (selectMode.value === 'single') {
      return toggleRowSelection(row)
    }

    if (isRowSelected(row)) {
      unselectRow(row)
    } else {
      selectRow(row)
    }
  }

  // exposed
  function shiftSelectRows (row: TableRow) {
    if (!selectable.value) {
      return
    }

    if (selectMode.value === 'single') {
      return toggleRowSelection(row)
    }

    if (prevShiftSelectedRows.value) {
      prevShiftSelectedRows.value.forEach(prevShiftSelectedRow => {
        unselectRow(prevShiftSelectedRow)
      })

      prevShiftSelectedRows.value.splice(0, prevShiftSelectedRows.value.length)
    }

    const targetIndex = rows.value.indexOf(row)
    const start = Math.min(prevSelectedRowIndex.value, targetIndex)
    const end = Math.max(prevSelectedRowIndex.value, targetIndex)

    const rowsToSelect = rows.value.slice(start, end + 1).filter(rowToSelect => !isRowSelected(rowToSelect))
    selectedItemsProxy.value = selectedItemsProxy.value.concat(rowsToSelect.map(row => row.source))

    prevShiftSelectedRows.value = rowsToSelect
  }

  // private
  function selectAllRows () {
    selectedItemsProxy.value = rows.value.map(row => row.source)
  }

  // private
  function unselectAllRows () {
    selectedItemsProxy.value.splice(0, selectedItemsProxy.value.length)
  }

  // exposed
  function toggleBulkSelection () {
    if (allRowsSelected.value) {
      unselectAllRows()
    } else {
      selectAllRows()
    }
  }

  // the following 4 checkers are all exposed
  function isRowSelected (row: TableRow) {
    return selectedItemsProxy.value.includes(row.source)
  }

  const noRowsSelected = computed(() => {
    return selectedItemsProxy.value.length === 0
  })

  const severalRowsSelected = computed(() => {
    return selectedItemsProxy.value.length > 0 && selectedItemsProxy.value.length < rows.value.length
  })

  const allRowsSelected = computed(() => {
    return selectedItemsProxy.value.length === rows.value.length
  })

  // emit the "selection-change" event each time the selection changes
  watch(selectedItemsProxy, (currentlySelectedItems, previouslySelectedItems) => {
    emit('selectionChange', {
      currentlySelectedItems,
      previouslySelectedItems,
    })
  })

  return {
    selectedItemsProxy,
    toggleRowSelection,
    ctrlSelectRow,
    shiftSelectRows,
    toggleBulkSelection,
    isRowSelected,
    noRowsSelected,
    severalRowsSelected,
    allRowsSelected,
  }
}
