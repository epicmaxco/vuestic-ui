import { PropType, ref, Ref, onMounted, onBeforeUnmount } from 'vue'

export const usePressedProps = {
  pressedBehaviour: { type: String as PropType<'opacity' | 'gradient'>, default: 'gradient' },
  pressedOpacity: { type: Number, default: 0.13 },
  pressedMaskColor: { type: String, default: '#000000' },
}

export function usePressed (el?: Ref<HTMLElement | undefined>) {
  const isPressed = ref(false)

  const onMouseDown = () => { isPressed.value = true }

  const onMouseUp = () => { isPressed.value = false }

  onMounted(() => {
    if (el?.value instanceof HTMLElement) {
      el.value?.addEventListener('mousedown', onMouseDown)
      el.value?.addEventListener('mouseup', onMouseUp)
      el.value?.addEventListener('mouseleave', onMouseUp)
    }
  })
  onBeforeUnmount(() => {
    if (el?.value instanceof HTMLElement) {
      el.value?.removeEventListener('mousedown', onMouseDown)
      el.value?.removeEventListener('mouseup', onMouseUp)
      el.value?.addEventListener('mouseleave', onMouseUp)
    }
  })

  return { isPressed, onMouseDown, onMouseUp }
}
