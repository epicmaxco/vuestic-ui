import { StringWithAutocomplete } from '../../../types/string-with-autocomplete'
import { Ref, computed, watch, ref } from 'vue'
import { DataTableRow, DataTableItem, DataTableSelectMode } from '../types'

interface useSelectableProps {
  modelValue: DataTableItem[] | undefined // selectedItems
  selectable: boolean
  selectMode: DataTableSelectMode
  [prop: string]: unknown
}
export type TEmits = 'update:modelValue' | 'selectionChange'
export type TSelectionChange = {
  currentSelectedItems: DataTableItem[],
  previousSelectedItems: DataTableItem[],
}
export type TSelectableEmits = (event: TEmits, arg: DataTableItem[] | TSelectionChange) => void

export default function useSelectableRow (
  paginatedRows: Ref<DataTableRow[]>,
  props: useSelectableProps,
  emit: TSelectableEmits,
) {
  const selectedItemsFallback = ref([] as DataTableItem[])

  const selectedItemsSync = computed<DataTableItem[]>({
    get () {
      if (props.modelValue === undefined) {
        return selectedItemsFallback.value
      } else {
        return props.modelValue
      }
    },

    set (modelValue) {
      if (props.modelValue === undefined) {
        selectedItemsFallback.value = modelValue
      }

      emit('update:modelValue', modelValue)
    },
  })

  const prevSelectedRowIndex = ref(-1)

  // clear all the selected rows when the `select-mode`'s value changes from multiple to single
  // (though it's safe enough to leave a selected item when changing from single to multiple
  watch(() => props.selectMode, (newSelectMode, oldSelectMode) => {
    if (newSelectMode === 'single' && oldSelectMode === 'multiple') {
      unselectAllRows()
      setPrevSelectedRowIndex(-1)
    }
  })

  // watch for rows changes (happens when filtering is applied e.g.)
  watch(paginatedRows, () => { setPrevSelectedRowIndex(-1) })

  // emit the "selection-change" event each time the selection changes
  watch(selectedItemsSync, (currentSelectedItems, previousSelectedItems) => {
    emit('selectionChange', {
      currentSelectedItems,
      previousSelectedItems,
    })
  })

  const noRowsSelected = computed(() => (
    !paginatedRows.value.some(({ source }) => selectedItemsSync.value.includes(source))
  ))

  const allRowsSelected = computed(() => {
    if (paginatedRows.value.length === 0) { return false }

    return paginatedRows.value.every(({ source }) => selectedItemsSync.value.includes(source))
  })

  const severalRowsSelected = computed(() => !noRowsSelected.value && !allRowsSelected.value)

  function isRowSelected (row: DataTableRow) {
    return selectedItemsSync.value.includes(row.source)
  }

  function selectAllRows () {
    selectedItemsSync.value = [...new Set([
      ...selectedItemsSync.value,
      ...paginatedRows.value.map(row => row.source),
    ])]
  }

  function unselectAllRows () {
    const paginatedRowsSource = paginatedRows.value.map(row => row.source)

    selectedItemsSync.value = selectedItemsSync.value
      .filter((row) => !paginatedRowsSource.includes(row))
  }

  // The one calling this function must guarantee that the row isn't already selected
  function selectRow (row: DataTableRow) {
    selectedItemsSync.value = [...selectedItemsSync.value, row.source]
  }

  function selectOnlyRow (row: DataTableRow) {
    selectedItemsSync.value = [row.source]
  }

  // The one calling this function must guarantee that the row is selected
  function unselectRow (row: DataTableRow) {
    const index = selectedItemsSync.value.findIndex(selectedItem => selectedItem === row.source)

    selectedItemsSync.value = [
      ...selectedItemsSync.value.slice(0, index),
      ...selectedItemsSync.value.slice(index + 1),
    ]
  }

  function setPrevSelectedRowIndex (rowInitialIndex: number) {
    if (rowInitialIndex === -1) {
      prevSelectedRowIndex.value = -1
    } else {
      const prevSelectedRow = paginatedRows.value.find(row => row.initialIndex === rowInitialIndex)

      prevSelectedRow
        ? prevSelectedRowIndex.value = paginatedRows.value.indexOf(prevSelectedRow)
        : prevSelectedRowIndex.value = -1
    }
  }

  function getRowsToSelect (targetIndex: number) {
    let start
    let end

    if (isRowSelected(paginatedRows.value[prevSelectedRowIndex.value])) {
      start = Math.min(prevSelectedRowIndex.value, targetIndex)
      end = Math.max(prevSelectedRowIndex.value, targetIndex)
    } else {
      start = Math.min(prevSelectedRowIndex.value + 1, targetIndex)
      end = Math.max(prevSelectedRowIndex.value - 1, targetIndex)
    }

    return paginatedRows.value.slice(start, end + 1)
  }

  function mergeSelection (rowsToSelect: DataTableRow[]) {
    const rowsToSelectSource = rowsToSelect.map(row => row.source)

    if (noRowsSelected.value) {
      selectedItemsSync.value = rowsToSelectSource
      return
    }

    const isInternalSelection = rowsToSelectSource.every(rowSource => selectedItemsSync.value.includes(rowSource))

    if (isInternalSelection) {
      selectedItemsSync.value = selectedItemsSync.value.filter(row => !rowsToSelectSource.includes(row))
      return
    }

    selectedItemsSync.value = [...new Set([
      ...selectedItemsSync.value,
      ...rowsToSelectSource,
    ])]
  }

  function toggleRowSelection (row: DataTableRow) {
    if (!props.selectable) {
      return
    }

    if (isRowSelected(row)) {
      unselectRow(row)
      props.selectMode === 'single' ? setPrevSelectedRowIndex(-1) : setPrevSelectedRowIndex(row.initialIndex)
    } else {
      props.selectMode === 'single' ? selectOnlyRow(row) : selectRow(row)
      setPrevSelectedRowIndex(row.initialIndex)
    }
  }

  function ctrlSelectRow (row: DataTableRow) {
    if (!props.selectable) {
      return
    }

    toggleRowSelection(row)
  }

  function shiftSelectRows (row: DataTableRow) {
    if (!props.selectable) {
      return
    }

    if (props.selectMode === 'single' || prevSelectedRowIndex.value === -1) {
      return toggleRowSelection(row)
    }

    const targetIndex = paginatedRows.value.indexOf(row)
    mergeSelection(getRowsToSelect(targetIndex))
    setPrevSelectedRowIndex(-1)
  }

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
