import { onMounted, shallowRef } from 'vue'
import { useCaptureEvent } from './useCaptureEvent'

export const useFocusedElement = () => {
  const activeEl = shallowRef<HTMLElement>()

  const updateActiveElement = () => {
    activeEl.value = document.activeElement as HTMLElement
  }

  onMounted(updateActiveElement)

  useCaptureEvent('focus', updateActiveElement)
  useCaptureEvent('blur', updateActiveElement)

  return activeEl
}
