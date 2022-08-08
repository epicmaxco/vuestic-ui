import { computed, ref, watch } from 'vue'
import { useDocument } from './../../../composables'

export const useAnchorSelector = (
  props: {
    anchorSelector: string | undefined,
    innerAnchorSelector: string | undefined,
  },
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

  return {
    anchorRef: computedAnchorRef,
  }
}
