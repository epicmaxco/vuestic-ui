import { Ref, watch, computed } from 'vue'
import { TableRow, ITableItem } from './useRows'

export type TFilterMethod = (source: any) => boolean
export type TFilteredArgs = { items: ITableItem[], itemsIndexes: number[] }
export type TFilterableEmits = (event: 'filtered', arg: TFilteredArgs) => void

export default function useFilterable (
  rawRows: Ref<TableRow[]>,
  filter: Ref<string>,
  filterMethod: Ref<TFilterMethod | undefined>,
  emit: TFilterableEmits,
) {
  const filteredRows = computed<TableRow[]>(() => {
    if (!rawRows.value.length) {
      return rawRows.value
    }

    if (filter.value === '' && !filterMethod.value) {
      return rawRows.value
    }

    return rawRows.value.filter(row => row.cells.some(cell => {
      return typeof filterMethod.value === 'function'
        ? filterMethod.value(cell.source)
        : cell.value.toLowerCase().includes(filter.value.toLowerCase())
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
