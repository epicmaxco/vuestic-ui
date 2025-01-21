import { useIsMounted } from './useIsMounted'
import { computed, Ref, warn } from 'vue'
import { TemplateRef, unwrapEl } from '../../../utils/unwrapEl'
import { useDocument } from '../ssr/useDocument'

export type MaybeHTMLElementOrSelector = string | TemplateRef

/** Available only when mounted */
export const useSelectorTemplateRef = (selector: Ref<MaybeHTMLElementOrSelector>): Ref<HTMLElement | undefined> => {
  const isMounted = useIsMounted()
  const document = useDocument()

  return computed(() => {
    if (typeof selector?.value === 'string') {
      if (selector.value === '') {
        return document.value?.body
      }

      // May not be available until mounted, so try to querySelector once again when mounted
      if (isMounted.value) {
        return document.value?.querySelector(selector.value) as HTMLElement
      }

      return document.value?.querySelector(selector.value) as HTMLElement | undefined
    }

    return unwrapEl(selector?.value)
  })
}
