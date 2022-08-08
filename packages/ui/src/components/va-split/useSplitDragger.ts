import { ExtractPropTypes, ref, Ref } from 'vue'

import { useEvent } from '../../composables'

export const useSplitDraggerProps = {
  vertical: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
}

export const useSplitDragger = (
  containerSizeComputed: Ref<number | undefined>,
  splitterPositionComputed: Ref<number>,
  props: ExtractPropTypes<typeof useSplitDraggerProps>,
) => {
  const isDragging = ref(false)
  const dragStartPosition = ref(0)
  const dragStartSplitterPosition = ref(0)
  const currentSplitterPosition = ref(0)

  const getEventPosition = (e: MouseEvent | TouchEvent, eventName: 'mousemove' | 'mousedown'): number => {
    const event = e.type === eventName ? e as MouseEvent : (e as TouchEvent).changedTouches[0]
    return props.vertical ? event.pageY : event.pageX
  }

  const startDragging = (e: MouseEvent | TouchEvent) => {
    if (props.disabled || !containerSizeComputed.value) { return }

    isDragging.value = true
    dragStartPosition.value = getEventPosition(e, 'mousedown')
    dragStartSplitterPosition.value = splitterPositionComputed.value
  }

  const processDragging = (e: MouseEvent | TouchEvent) => {
    if (!isDragging.value) { return }

    const currentPosition = getEventPosition(e, 'mousemove')
    const distance = currentPosition - dragStartPosition.value
    currentSplitterPosition.value = dragStartSplitterPosition.value + Math.floor((distance / containerSizeComputed.value!) * 100)
  }

  const stopDragging = () => {
    isDragging.value = false
  }

  useEvent(['mousemove', 'touchmove'], processDragging)
  useEvent(['mouseup', 'touchcancel'], stopDragging)

  return { isDragging, startDragging, currentSplitterPosition }
}
