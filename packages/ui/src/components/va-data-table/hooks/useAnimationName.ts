
import { computed, Ref, ref, watch } from 'vue'
import type { DataTableRow } from '../types'

interface useSelectableProps {
  currentPage: number | undefined
  animated: boolean
}

export default function usePaginatedRows (
  props: useSelectableProps,
  rows: Ref<DataTableRow[]>,
) {
  const animationName = ref('table-transition-shuffle')
  const oldRowsLength = ref(rows.value.length)
  const isDifferentRowLength = computed(() => rows.value.length !== oldRowsLength.value)

  watch(rows, (newRows) => {
    const animationType = isDifferentRowLength.value || newRows.length > 50 ? 'fade' : 'shuffle'

    animationName.value = props.animated ? `table-transition-${animationType}` : ''

    oldRowsLength.value = newRows.length
  })

  watch(() => props.currentPage, () => {
    if (!isDifferentRowLength.value) {
      animationName.value = props.animated ? 'table-transition-shuffle' : ''
    }
  })

  return animationName
}
