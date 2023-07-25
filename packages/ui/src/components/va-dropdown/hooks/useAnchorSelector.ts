import { computed, ref } from 'vue'

import { useDocument, useIsMounted } from '../../../composables'
import { unwrapEl } from '../../../utils/unwrapEl'

export const useAnchorSelector = (
  props: {
    anchorSelector: string | undefined,
    innerAnchorSelector: string | undefined,
  },
) => {
  const anchorRef = ref<HTMLElement>()
  const document = useDocument()
  const isMounted = useIsMounted()

  const computedAnchorRef = computed<HTMLElement | undefined>({
    set (v: HTMLElement | undefined) {
      anchorRef.value = unwrapEl(v)
    },
    get () {
      // eslint-disable-next-line no-unused-expressions
      isMounted.value // querySelector can return undefined before component mounted

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
