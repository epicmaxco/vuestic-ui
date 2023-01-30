import { Ref, computed, PropType, ExtractPropTypes } from 'vue'

import { useCurrentPageProp } from './useCommonProps'

import type { DataTableRow } from '../types'

export const usePaginatedRowsProps = {
  ...useCurrentPageProp,
  perPage: { type: Number as PropType<number | undefined> },
}

export const usePaginatedRows = (
  sortedRows: Ref<DataTableRow[]>,
  props: ExtractPropTypes<typeof usePaginatedRowsProps>,
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

  return {
    paginatedRows,
  }
}
