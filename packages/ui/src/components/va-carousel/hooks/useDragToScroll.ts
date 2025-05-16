import { ref, Ref, watch } from 'vue'
import { TemplateRef } from '../../../utils/unwrapEl'
import { useElementPressed, useMouse } from '../../../composables'

export const useDragToScroll = (
  el: Ref<TemplateRef>,
  events: {
    onDragStart?: () => void
    onDragMove?: (movementX: number) => void
    onDragEnd?: (movementX: number) => void
  } = {},
) => {
  const isPressed = useElementPressed(el)
  const { mouseX } = useMouse()
  const movementX = ref(0)

  let pressedMouseX = 0

  watch(mouseX, (x) => {
    if (!isPressed.value) { return }

    movementX.value = x - pressedMouseX

    events.onDragMove?.(movementX.value)
  })

  watch(isPressed, (pressed) => {
    if (pressed) {
      movementX.value = 0
      pressedMouseX = mouseX.value

      events.onDragStart?.()
    } else {
      events.onDragEnd?.(movementX.value)
    }
  })

  return {
    isPressed,
    movementX,
    mouseX,
  }
}
