import { computed, ref, watch } from 'vue'
import { useDocument } from './../../../composables'

export const useAnchorSelector = (
  props: {
    anchorSelector: string | undefined,
    innerAnchorSelector: string | undefined,
  },
  listeners: Record<string, (...args: any[]) => any>,
) => {
  const anchorRef = ref<HTMLElement>()
  const document = useDocument()

  const computedAnchorRef = computed<HTMLElement | undefined>({
    set (v) {
      if (props.anchorSelector) {
        anchorRef.value = document.value?.querySelector(props.anchorSelector) ?? v
      } else if (props.innerAnchorSelector) {
        anchorRef.value = document.value?.querySelector(props.innerAnchorSelector) ?? v
      } else {
        anchorRef.value = v
      }
    },
    get () {
      return anchorRef.value
    },
  })

  watch(computedAnchorRef, (newValue, oldValue) => {
    if (newValue === oldValue) { return }

    Object.keys(listeners).forEach((listener) => {
      oldValue?.removeEventListener(listener, listeners[listener])
      newValue?.addEventListener(listener, listeners[listener])
    })
  }, { immediate: true })

  return {
    anchorRef: computedAnchorRef,
  }
}
