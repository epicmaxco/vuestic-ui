import { ExtractPropTypes, onBeforeUnmount, onMounted, ref, Ref } from 'vue'

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

  onMounted(() => {
    document.addEventListener('mousemove', processDragging)
    document.addEventListener('touchmove', processDragging)
    document.addEventListener('mouseup', stopDragging)
    document.addEventListener('touchcancel', stopDragging)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('mousemove', processDragging)
    document.removeEventListener('touchmove', processDragging)
    document.removeEventListener('mouseup', stopDragging)
    document.removeEventListener('touchcancel', stopDragging)
  })

  return { isDragging, startDragging, processDragging, stopDragging, currentSplitterPosition }
}
