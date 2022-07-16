import { useDocument } from './../../../composables'
import { computed, ref, watch } from 'vue'

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
    set (v) { anchorRef.value = v },
    get () {
      if (props.innerAnchorSelector) { return anchorRef.value?.querySelector(props.innerAnchorSelector) || anchorRef.value }

      return props.anchorSelector
        ? document.value?.querySelector(props.anchorSelector) || anchorRef.value
        : anchorRef.value
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
