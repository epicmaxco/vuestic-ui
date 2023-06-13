import { computed, ComputedRef, reactive, Ref } from 'vue'
import { useEvent } from '../../../composables'
import { CursorAnchor } from '../types'

/**
 * Returns floating-ui compatible virtual element (https://floating-ui.com/docs/virtual-elements)
 * Floating UI can't update position of the element that is not in the DOM automatically, so we need to update it manually
 * We save mouse position relatively to the anchor el and recalculate it once anchor position changes
 * @param anchorRef anchor element ref
 * @param noUpdate flag that indicates that we should not update the position of the dropdown
 */
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
        // mx, my - mouse position when dropdown was opened
        // ax, ay - anchor position when dropdown was opened
        // x, y - current anchor position
        // shiftX, shiftY - difference between anchor position when dropdown was opened and current anchor position
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
