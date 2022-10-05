import { computed, Ref, ref, watch } from 'vue'

import type { DataTableRow } from '../types'

type AnimationName = 'shuffle' | 'fade'

interface useAnimationNameProps {
  currentPage: number | undefined
  animated: boolean
}

export default function useAnimationName (
  props: useAnimationNameProps,
  rows: Ref<DataTableRow[]>,
) {
  const animationType = ref<AnimationName>('shuffle')

  const animationName = computed(() => props.animated ? `table-transition-${animationType.value}` : '')

  const oldRowsLength = ref(rows.value.length)
  const isDifferentRowLength = computed(() => rows.value.length !== oldRowsLength.value)

  watch(rows, (newRows, oldRows) => {
    const hasRows = !!(newRows.length && oldRows.length)

    animationType.value = newRows.length > 50 || (isDifferentRowLength.value && hasRows)
      ? 'fade'
      : 'shuffle'

    oldRowsLength.value = newRows.length
  })

  watch(() => props.currentPage, () => {
    if (!isDifferentRowLength.value) {
      animationType.value = 'shuffle'
    }
  })

  return animationName
}
