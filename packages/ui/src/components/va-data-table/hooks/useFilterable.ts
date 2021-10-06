import { Ref, computed, watch } from 'vue'
import { TableRow, ITableItem } from './useRows'

export type TFilterMethod = (source: any) => boolean
export type TFilterableEmits = (event: 'filtered', arg: ITableItem[]) => void

export default function useFilterable (
  rows: Ref<TableRow[]>,
  filter: Ref<string>,
  filterMethod: Ref<TFilterMethod | undefined>,
  emit: TFilterableEmits,
) {
  // if `filter` is an empty string, then simply return all the rows. Else, filter each row's cells' values to contain
  // the provided `filter` substring and return only those rows which do have at least one such cell (or use a custom
  // function if it's provided).
  const filteredRows = computed<TableRow[]>(() => {
    if (filter.value === '') { return rows.value }

    return rows.value.filter(row => {
      return row.cells.some(cell => {
        return typeof filterMethod.value === 'function'
          ? filterMethod.value(cell.source)
          : cell.value.toLowerCase().includes(filter.value.toLowerCase())
      })
    })
  })

  watch(filteredRows, () => {
    const filteredRowsSource = filteredRows.value.map(row => row.source)
    emit('filtered', filteredRowsSource)
  })

  return {
    filteredRows,
  }
}
