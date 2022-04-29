import { Ref, computed } from 'vue'
import { TableRow } from '../types'

interface useSelectableProps {
  perPage: number | undefined
  currentPage: number | undefined
  [prop: string]: unknown
}

export default function usePaginatedRows (
  sortedRows: Ref<TableRow[]>,
  props: useSelectableProps,
) {
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
