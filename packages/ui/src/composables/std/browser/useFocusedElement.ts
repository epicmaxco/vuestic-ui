import { onMounted, shallowRef } from 'vue'
import { useEvent } from '../event/useEvent'
import { makeSharedComposable } from '../internal/makeSharedComposable'

export const useFocusedElement = makeSharedComposable(() => {
  const activeEl = shallowRef<HTMLElement>()

  const updateActiveElement = () => {
    activeEl.value = document.activeElement as HTMLElement
  }

  onMounted(updateActiveElement)

  useEvent('focus', updateActiveElement, true)
  useEvent('blur', updateActiveElement, true)

  return activeEl
})
