import { ref, Ref } from 'vue'

export const useGridKeyboardNavigation = (
  rowSize: number,
  offset: { start?: Ref<number>, end?: Ref<number> } = {},
) => {
  const focusedCellIndex = ref(-1)

  let previouslyClicked = false
  const onMousedown = () => { previouslyClicked = true }

  const onFocus = () => {
    if (previouslyClicked) { return }
    previouslyClicked = false

    focusedCellIndex.value = offset.start?.value || 0
  }

  const onBlur = () => {
    previouslyClicked = false

    focusedCellIndex.value = -1
  }

  const onKeydown = (e: KeyboardEvent) => {
    if (['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
      // Prevent default for arrow keys and enter. Do not prevent default for tab! :)
      e.preventDefault()
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

    if (offset.start && focusedCellIndex.value < offset.start.value) {
      focusedCellIndex.value = offset.start.value
    }
    if (offset.end && focusedCellIndex.value > offset.end.value - 1) {
      focusedCellIndex.value = offset.end.value - 1
    }
  }

  const listeners = {
    onFocus, onKeydown, onBlur, onMousedown,
  }

  return {
    focusedCellIndex, listeners,
  }
}
