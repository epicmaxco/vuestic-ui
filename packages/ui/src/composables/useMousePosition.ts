import { useClientOnly } from './useClientOnly'
import { onMounted, onBeforeUnmount, Ref, reactive } from 'vue'

export const useMousePosition = (el?: Ref<GlobalEventHandlers | undefined | null>) => {
  if (!el) {
    el = useClientOnly(() => window as GlobalEventHandlers)
  }

  const mouse = reactive({ x: 0, y: 0 })

  const onMouseMove = (e: MouseEvent) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  }

  onMounted(() => {
    el?.value?.addEventListener('mousemove', onMouseMove)
  })

  onBeforeUnmount(() => {
    el?.value?.removeEventListener('mousemove', onMouseMove)
  })

  return mouse
}
