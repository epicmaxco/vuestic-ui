import { computed, reactive, Ref, watchEffect } from 'vue'
import { useEvent } from '../../../composables/useEvent'

/** Returns fake HTML Element which `getBoundingClientRect` method returns mouse position */
export const useCursorAnchor = (anchorRef: Ref<HTMLElement | undefined>, noUpdate: Ref<boolean>) => {
  const mouse = reactive({ x: 0, y: 0 })

  useEvent(['mousemove', 'mousedown', 'mouseup'], (e: MouseEvent) => {
    const { x, y } = anchorRef.value!.getBoundingClientRect()
    mouse.x = e.clientX - x
    mouse.y = e.clientY - y
  }, anchorRef)

  const mouseOffset = {
    x: 0,
    y: 0,
  }

  watchEffect(() => {
    if (noUpdate.value) { return }
    mouseOffset.x = mouse.x
    mouseOffset.y = mouse.y
  })

  return computed(() => {
    if (!anchorRef.value) { return undefined }

    const target = anchorRef.value

    const getBoundingClientRect = () => {
      const rect = target.getBoundingClientRect()
      const x = rect.left + mouseOffset.x
      const y = rect.top + mouseOffset.y

      return {
        ...rect,
        width: 1,
        height: 1,
        x: x,
        y: y,
        bottom: y + 1,
        right: x + 1,
        left: x,
        top: y,
      }
    }

    return {
      getBoundingClientRect () {
        return getBoundingClientRect()
      },
    } as unknown as HTMLElement // TODO: Change to DOMRectable instead of HTMLElement
  })
}
