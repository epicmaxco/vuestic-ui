
import { Ref, ref, watch } from 'vue'
import { TableRow } from '../types'

interface useSelectableProps {
  currentPage: number | undefined
  animated: boolean
}

export default function usePaginatedRows (
  props: useSelectableProps,
  rows: Ref<TableRow[]>,
) {
  const animationName = ref('table-transition-move')

  watch(rows, (newRows, oldRows) => {
    const animationType = (newRows.length !== oldRows.length) || (newRows.length > 50) ? 'fade' : 'move'

    animationName.value = props.animated ? `table-transition-${animationType}` : ''
  })

  watch(() => props.currentPage, (page, oldPage) => {
    if (page !== oldPage) {
      animationName.value = props.animated ? 'table-transition-move' : ''
    }
  })

  return animationName
}
