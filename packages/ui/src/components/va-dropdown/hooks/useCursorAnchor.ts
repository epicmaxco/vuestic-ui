import { computed, ComputedRef, reactive, Ref } from 'vue'
import { useEvent } from '../../../composables'
import { CursorAnchor } from '../types'

/**
 * Returns floating-ui compatible virtual element (https://floating-ui.com/docs/virtual-elements)
 * Floating UI can't automatically update position of the element that is not in the DOM, so we need to update it manually
 * We save mouse position relatively to the anchor element and recalculate it once anchor position changes (after scroll/resize/...)
 * @param anchorRef anchor element ref
 * @param noUpdate flag that indicates that we should not update the position of the dropdown
 */
export const useCursorAnchor = (anchorRef: Ref<HTMLElement | undefined>, enabled: Ref<boolean>): ComputedRef<CursorAnchor> => {
  const position = reactive({ x: 0, y: 0 })

  useEvent(['mousemove', 'mousedown', 'mouseup'], (e: MouseEvent) => {
    if (!enabled.value) { return }

    const { x, y } = anchorRef.value?.getBoundingClientRect() ?? { x: 0, y: 0 }

    position.x = e.clientX - x
    position.y = e.clientY - y
  }, anchorRef)

  return computed(() => {
    return {
      getBoundingClientRect () {
        // anchor position possibly changed, we need to update the position of the floating element
        const { x, y } = anchorRef.value?.getBoundingClientRect() ?? { x: 0, y: 0 }
        const resX = position.x + x
        const resY = position.y + y
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
