import { Ref, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue'
import { useEvent } from './useEvent'

export const useElementRect = (element: Ref<HTMLElement | null>) => {
  const rect = ref({ top: 0, left: 0, width: 0, height: 0 }) as Ref<DOMRect>

  const updateRect = () => {
    if (element.value) {
      rect.value = element.value.getBoundingClientRect()
    }
  }

  let animationRequestId = -1
  const req = () => {
    updateRect()
    animationRequestId = requestAnimationFrame(req)
  }

  onMounted(() => {
    req()
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(animationRequestId)
  })

  return rect
}
