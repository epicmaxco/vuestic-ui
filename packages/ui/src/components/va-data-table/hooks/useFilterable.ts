import { Ref, watch, computed } from 'vue'

import { useThrottleValue } from '../../../composables'

import type { DataTableRow, DataTableFilterMethod, DataTableItem } from '../types'

interface useFilterableProps {
  filter: string
  filterMethod: DataTableFilterMethod | undefined
  delay: number
  [prop: string]: unknown
}

export type TFilteredArgs = { items: DataTableItem[], itemsIndexes: number[] }
export type TFilterableEmits = (event: 'filtered', arg: TFilteredArgs) => void

export default function useFilterable (
  rawRows: Ref<DataTableRow[]>,
  props: useFilterableProps,
  emit: TFilterableEmits,
) {
  const filteredRows = computed<DataTableRow[]>(() => {
    if (!rawRows.value.length) {
      return rawRows.value
    }

    if (props.filter === '' && !props.filterMethod) {
      return rawRows.value
    }

    return rawRows.value.filter(row => row.cells.some(cell => {
      return typeof props.filterMethod === 'function'
        ? props.filterMethod(cell.source)
        : cell.value.toLowerCase().includes(props.filter.toLowerCase())
    }))
  })

  const filteredRowsThrottled = useThrottleValue(filteredRows, props)

  watch(filteredRowsThrottled, () => {
    emit('filtered', {
      items: filteredRowsThrottled.value.map(row => row.source),
      itemsIndexes: filteredRowsThrottled.value.map(row => row.initialIndex),
    })
  })

  return {
    filteredRows: filteredRowsThrottled,
  }
}
