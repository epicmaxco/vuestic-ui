import { Ref, computed, PropType, ExtractPropTypes } from 'vue'

import { useCurrentPageProp } from './useCommonProps'

import { useNumericProp, useThrottleValue } from '../../../composables'

import type { DataTableItem, DataTableRow } from '../types'

export const usePaginatedRowsProps = {
  ...useCurrentPageProp,
  perPage: { type: Number as PropType<number | undefined> },
  delay: { type: [Number, String], default: 0 },
}

type PaginatedProps<Item extends DataTableItem> = Omit<ExtractPropTypes<typeof usePaginatedRowsProps>, 'items'> & {
  items: Item[]
}

export const usePaginatedRows = <Item extends DataTableItem>(
  sortedRows: Ref<DataTableRow<Item>[]>,
  props: PaginatedProps<Item>,
) => {
  const paginatedRows = computed(() => {
    if (!props.perPage || props.perPage < 0) {
      return sortedRows.value
    }

    if (!props.currentPage || props.currentPage < 0) {
      return sortedRows.value.slice(0, props.perPage)
    }

    const pageStartIndex = props.perPage * (props.currentPage - 1)
    return sortedRows.value.slice(pageStartIndex, pageStartIndex + props.perPage)
  })

  const paginatedRowsThrottled = useThrottleValue(paginatedRows, useNumericProp('delay'))

  return {
    paginatedRows: paginatedRowsThrottled,
  }
}
