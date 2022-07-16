import { computed, reactive, Ref } from 'vue'
import { useEvent } from '../../../composables/useEvent'

export const useCursorAnchor = (anchorRef: Ref<HTMLElement | undefined>, noUpdate: Ref<boolean>) => {
  const mouse = reactive({ x: 0, y: 0 })

  useEvent(['mousemove', 'mousedown', 'mouseup'], (e: MouseEvent) => {
    if (noUpdate.value) { return }

    mouse.x = e.offsetX
    mouse.y = e.offsetY
  }, anchorRef)

  return computed(() => {
    if (!anchorRef.value) { return undefined }

    const target = anchorRef.value

    const getBoundingClientRect = () => {
      const rect = target.getBoundingClientRect()

      const x = rect.x + mouse.x
      const y = rect.y + mouse.y

      return {
        x: x,
        y: y,
        bottom: y + 1,
        right: x + 1,
        left: x,
        top: y,
      }
    }

    return new Proxy<HTMLElement>(target, {
      get (target, key: keyof typeof target) {
        if (key === 'getBoundingClientRect') {
          return getBoundingClientRect
        }

        return target[key]
      },
    })
  })
}
