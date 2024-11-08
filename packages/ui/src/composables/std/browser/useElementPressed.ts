import { ref, Ref } from 'vue'

import { useElementTemplateRef, useEvent } from '../'

export function useElementPressed (el: Ref<HTMLElement | undefined>) {
  const isPressed = ref(false)

  const target = useElementTemplateRef(el ?? ref())

  useEvent(['mousedown', 'touchstart', 'dragstart'], () => { isPressed.value = true }, target)
  useEvent([
    'mouseup', 'mouseleave',
    'touchend', 'touchcancel',
    'drop', 'dragend',
  ], () => { isPressed.value = false }, true)

  return isPressed
}
