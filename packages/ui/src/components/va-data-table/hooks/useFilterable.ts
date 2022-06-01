import { Ref, watch, computed } from 'vue'
import { TableRow, VaDataTableFilterMethod, VaDataTableItem } from '../types'

interface useFilterableProps {
  filter: string
  filterMethod: VaDataTableFilterMethod | undefined
  [prop: string]: unknown
}

export type TFilteredArgs = { items: VaDataTableItem[], itemsIndexes: number[] }
export type TFilterableEmits = (event: 'filtered', arg: TFilteredArgs) => void

export default function useFilterable (
  rawRows: Ref<TableRow[]>,
  props: useFilterableProps,
  emit: TFilterableEmits,
) {
  const filteredRows = computed<TableRow[]>(() => {
    if (!rawRows.value.length) {
      return rawRows.value
    }

    if (props.filter === '' && !props.filterMethod) {
      return rawRows.value
    }

    return rawRows.value.filter(row => row.cells.some(cell => {
      return typeof props.filterMethod === 'function'
        ? props.filterMethod(cell.rowData[cell.column.key])
        : cell.value.toLowerCase().includes(props.filter.toLowerCase())
    }))
  })

  watch(filteredRows, () => {
    emit('filtered', {
      items: filteredRows.value.map(row => row.source),
      itemsIndexes: filteredRows.value.map(row => row.initialIndex),
    })
  })

  return {
    filteredRows,
  }
}
