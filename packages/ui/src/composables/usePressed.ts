import { PropType, ref, Ref, onMounted, onBeforeUnmount } from 'vue'

export const usePressedProps = {
  pressedBehaviour: {
    type: String as PropType<'opacity' | 'mask'>,
    default: 'mask',
    validator: (value: string) => ['opacity', 'mask'].includes(value),
  },
  pressedOpacity: { type: Number, default: 0.13 },
  pressedMaskColor: { type: String, default: 'black' },
}

export function usePressed (el?: Ref<HTMLElement | undefined>) {
  const isPressed = ref(false)

  const onMouseDown = () => { isPressed.value = true }
  const onMouseUp = () => { isPressed.value = false }

  let element: any
  onMounted(() => {
    element = (el?.value as any)?.$el ?? el?.value
    if (element) {
      element.addEventListener('mousedown', onMouseDown)
      element.addEventListener('mouseup', onMouseUp)
      element.addEventListener('mouseleave', onMouseUp)
    }
  })
  onBeforeUnmount(() => {
    if (element) {
      element.removeEventListener('mousedown', onMouseDown)
      element.removeEventListener('mouseup', onMouseUp)
      element.addEventListener('mouseleave', onMouseUp)
    }
  })

  return { isPressed, onMouseDown, onMouseUp }
}
