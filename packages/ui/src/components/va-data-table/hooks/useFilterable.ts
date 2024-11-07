import { Ref, watch, computed, PropType, ExtractPropTypes } from 'vue'

import { useNumericProp, useThrottleValue } from '../../../composables'

import type { DataTableRow, DataTableFilterMethod, DataTableItem } from '../types'

export const useFilterableProps = {
  filter: { type: String, default: '' },
  filterMethod: { type: Function as PropType<DataTableFilterMethod | undefined> },
  delay: { type: [Number, String], default: 0 },
}

export type TFilteredArgs = { items: DataTableItem[], itemsIndexes: number[] }
export type TFilterableEmits = (event: 'filtered', arg: TFilteredArgs) => void

export const useFilterable = <Item extends DataTableRow>(
  rawRows: Ref<Item[]>,
  props: ExtractPropTypes<typeof useFilterableProps>,
  emit: TFilterableEmits,
) => {
  const filteredRows = computed<Item[]>(() => {
    if (!rawRows.value.length) {
      return rawRows.value
    }

    if (props.filter === '' && !props.filterMethod) {
      return rawRows.value
    }

    return rawRows.value.filter((row) =>
      row.cells.some((cell) => {
        if (typeof props.filterMethod === 'function') {
          return props.filterMethod(cell.source, cell)
        }

        const cellRegex = new RegExp(props.filter, 'i')
        return cellRegex.test(cell.value)
      }),
    )
  })

  const filteredRowsThrottled = useThrottleValue(filteredRows, useNumericProp('delay'))

  watch(filteredRowsThrottled, () => {
    emit('filtered', {
      items: filteredRowsThrottled.value.map(row => row.source),
      itemsIndexes: filteredRowsThrottled.value.map(row => row.initialIndex),
    })
  })

  if (filteredRows.value.length !== rawRows.value.length) {
    emit('filtered', {
      items: filteredRows.value.map(row => row.source),
      itemsIndexes: filteredRows.value.map(row => row.initialIndex),
    })
  }

  return {
    filteredRows: filteredRowsThrottled,
  }
}
