import { computed, ComputedRef, reactive, Ref } from 'vue'
import { useEvent } from '../../../composables'
import { CursorAnchor } from '../types'

export const useCursorAnchor = (anchorRef: Ref<HTMLElement | undefined>, noUpdate: Ref<boolean>): ComputedRef<CursorAnchor> => {
  const anchor = reactive({ x: 0, y: 0 })
  const mouse = reactive({ x: 0, y: 0 })

  useEvent(['mousemove', 'mousedown', 'mouseup'], (e: MouseEvent) => {
    if (noUpdate.value) { return }
    mouse.x = e.clientX
    mouse.y = e.clientY
    const { x, y } = anchorRef.value?.getBoundingClientRect() ?? { x: 0, y: 0 }
    anchor.x = x
    anchor.y = y
  }, anchorRef)

  return computed(() => {
    return {
      getBoundingClientRect () {
        const { x, y } = anchorRef.value?.getBoundingClientRect() ?? { x: 0, y: 0 }
        const { x: mx, y: my } = mouse
        const { x: ax, y: ay } = anchor
        const shiftX = ax - x
        const shiftY = ay - y
        const resX = mx - shiftX
        const resY = my - shiftY
        return {
          width: 0,
          height: 0,
          x: resX,
          y: resY,
          top: resY,
          right: resX,
          bottom: resY,
          left: resX,
        }
      },
      contextElement: anchorRef.value,
    }
  })
}
