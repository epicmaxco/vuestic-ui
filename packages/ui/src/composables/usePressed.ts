import { ref, Ref, onMounted } from 'vue'

import { useHTMLElement, useEvent } from './'

export function usePressed (el?: Ref<HTMLElement | undefined>) {
  const isPressed = ref(false)

  const onMouseDown = () => { isPressed.value = true }
  const onMouseUp = () => { isPressed.value = false }

  onMounted(() => {
    if (!el?.value) { return }
    const getTarget = useHTMLElement(el as Ref<HTMLElement>)
    useEvent('mousedown', onMouseDown, getTarget)
    useEvent(['mouseup', 'mouseleave'], onMouseUp, getTarget)
  })

  return { isPressed, onMouseDown, onMouseUp }
}
