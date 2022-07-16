import { useDocument } from './../../../composables'
import { computed, ref, watch } from 'vue'

export const useAnchorSelector = (props: { anchorSelector: string | undefined }, listeners: Record<string, (...args: any[]) => any>) => {
  const anchorRef = ref<HTMLElement>()
  const document = useDocument()

  const computedAnchorRef = computed(() => (
    props.anchorSelector
      ? document.value?.querySelector(props.anchorSelector) || anchorRef.value
      : anchorRef.value
    ) as HTMLElement | undefined)

  watch(computedAnchorRef, (newValue, oldValue) => {
    Object.keys(listeners).forEach((listener) => {
      console.log(listener, newValue, oldValue)
      oldValue?.removeEventListener(listener, listeners[listener])
      newValue?.addEventListener(listener, listeners[listener])
    })
  }, { immediate: true })

  return {
    computedAnchorRef, anchorRef,
  }
}
