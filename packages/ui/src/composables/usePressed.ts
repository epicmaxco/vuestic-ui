import { ref, Ref, onMounted } from 'vue'

import { useHTMLElement, useEvent } from './'

export function usePressed (el?: Ref<HTMLElement | undefined>) {
  const isPressed = ref(false)

  const onMouseDown = () => { isPressed.value = true }
  const onMouseUp = () => {
    isPressed.value = false
  }

  const target = useHTMLElement(el as Ref<HTMLElement>)

  useEvent(['mousedown', 'touchstart', 'dragstart'], onMouseDown, target)
  useEvent([
    'mouseup', 'mouseleave',
    'touchend', 'touchcancel',
    'drop', 'dragend',
  ], onMouseUp, true)

  return { isPressed, onMouseDown, onMouseUp }
}
