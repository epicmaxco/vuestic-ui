import { computed, reactive, Ref, watch, watchEffect } from 'vue'
import { useEvent } from '../../../composables/useEvent'

export const useCursorAnchor = (anchorRef: Ref<HTMLElement | undefined>, noUpdate: Ref<boolean>) => {
  const mouse = reactive({ x: 0, y: 0 })

  useEvent(['mousemove', 'mousedown', 'mouseup'], (e: MouseEvent) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  }, anchorRef)

  const cache = {
    x: 0,
    y: 0,
  }

  watchEffect(() => {
    if (noUpdate.value) { return }
    cache.x = mouse.x
    cache.y = mouse.y
  })

  return computed(() => {
    if (!anchorRef.value) { return undefined }

    const target = anchorRef.value

    const getBoundingClientRect = () => {
      const x = cache.x
      const y = cache.y

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
