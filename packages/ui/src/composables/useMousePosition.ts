import { Ref, reactive } from 'vue'
import { useEvent } from './useEvent'
import { useWindow } from './useWindow'

export const useMousePosition = (el?: Ref<GlobalEventHandlers | undefined | null>) => {
  if (!el) {
    el = useWindow()
  }

  const mouse = reactive({ x: 0, y: 0 })

  const onMouseMove = (e: MouseEvent) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  }

  useEvent('mousemove', onMouseMove, el)

  return mouse
}
