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
    set (v: HTMLElement | undefined) {
      anchorRef.value = v
    },
    get () {
      if (props.anchorSelector) {
        return document.value?.querySelector<HTMLElement>(props.anchorSelector) ?? anchorRef.value
      } else if (props.innerAnchorSelector && anchorRef.value) {
        return anchorRef.value?.querySelector<HTMLElement>(props.innerAnchorSelector) ?? anchorRef.value
      }
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
