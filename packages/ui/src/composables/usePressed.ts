import { ref, Ref } from 'vue'

import { useElementTemplateRef, useEvent } from './'

export function usePressed (el?: Ref<HTMLElement | undefined>) {
  const isPressed = ref(false)

  const onMouseDown = () => { isPressed.value = true }
  const onMouseUp = () => {
    isPressed.value = false
  }

  const target = useElementTemplateRef(el ?? ref())

  useEvent(['mousedown', 'touchstart', 'dragstart'], onMouseDown, target)
  useEvent([
    'mouseup', 'mouseleave',
    'touchend', 'touchcancel',
    'drop', 'dragend',
  ], onMouseUp, true)

  return { isPressed, onMouseDown, onMouseUp }
}
