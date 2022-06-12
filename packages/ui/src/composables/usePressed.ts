import { ref, onMounted, onBeforeUnmount, Ref } from 'vue'

export function usePressed (
  el?: Ref<HTMLElement | undefined>,
) {
  const isPressed = ref(false)

  const onMouseDown = () => {
    isPressed.value = true
  }

  const onMouseUp = () => {
    isPressed.value = false
  }

  if (el) {
    onMounted(() => {
      if (el?.value instanceof HTMLElement) {
        el.value?.addEventListener('mousedown', onMouseDown)
        el.value?.addEventListener('mouseup', onMouseUp)
      }
    })
    onBeforeUnmount(() => {
      if (el?.value instanceof HTMLElement) {
        el.value?.removeEventListener('mousedown', onMouseDown)
        el.value?.removeEventListener('mouseup', onMouseUp)
      }
    })
  }

  return {
    isPressed,
    onMouseDown,
    onMouseUp,
  }
}
