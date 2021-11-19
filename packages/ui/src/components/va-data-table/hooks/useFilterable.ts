import { Ref, watch, computed } from 'vue'
import { TableRow, ITableItem } from './useRows'

export type TFilterMethod = (source: any) => boolean
export type TFilterableEmits = (event: 'filtered', arg: ITableItem[]) => void

export default function useFilterable (
  rawRows: Ref<TableRow[]>,
  filter: Ref<string>,
  filterMethod: Ref<TFilterMethod | undefined>,
  emit: TFilterableEmits,
) {
  const filteredRows = computed<TableRow[]>(() => {
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
    emit('filtered', filteredRows.value.map(row => row.source))
  })

  return {
    filteredRows,
  }
}
