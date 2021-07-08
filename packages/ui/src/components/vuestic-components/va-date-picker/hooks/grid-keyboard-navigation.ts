import { ref, Ref, isRef, unref } from 'vue'

function safeUnref<T> (refOrRaw: Ref<T> | T): T {
  if (isRef(refOrRaw)) {
    return unref(refOrRaw)
  }

  return refOrRaw
}

function isUndefined<T> (t: T | undefined): t is undefined {
  return t === undefined
}

export const useGridKeyboardNavigation = (
  rowSize: number,
  offset: { start?: Ref<number> | number, end?: Ref<number> | number } = {},
  onSelected?: (selectedValue: number) => any | null,
) => {
  const focusedCellIndex = ref(-1)

  let previouslyClicked = false
  const onMousedown = () => { previouslyClicked = true }

  const onFocus = () => {
    if (previouslyClicked) { return }
    previouslyClicked = false

    focusedCellIndex.value = safeUnref(offset.start) || 0
  }

  const onBlur = () => {
    previouslyClicked = false

    focusedCellIndex.value = -1
  }

  const onKeydown = (e: KeyboardEvent) => {
    if (['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Enter', 'Space'].includes(e.key)) {
      // Prevent default for arrow keys and enter. Do not prevent default for tab! :)
      e.preventDefault()
    }

    if (e.key === 'Enter' || e.key === 'Space') {
      if (onSelected === undefined) { return }

      onSelected(focusedCellIndex.value)
      return
    }

    if (e.key === 'ArrowRight') {
      focusedCellIndex.value += 1
    }
    if (e.key === 'ArrowLeft') {
      focusedCellIndex.value -= 1
    }
    if (e.key === 'ArrowDown') {
      focusedCellIndex.value += rowSize
    }
    if (e.key === 'ArrowUp') {
      focusedCellIndex.value -= rowSize
    }

    if (!isUndefined(offset.start) && focusedCellIndex.value < safeUnref(offset.start)) {
      focusedCellIndex.value = safeUnref(offset.start)
    }
    if (!isUndefined(offset.end) && focusedCellIndex.value > safeUnref(offset.end) - 1) {
      focusedCellIndex.value = safeUnref(offset.end) - 1
    }
  }

  const containerAttributes = {
    onFocus, onKeydown, onBlur, onMousedown, tabindex: 0,
  }

  return {
    focusedCellIndex, containerAttributes,
  }
}
