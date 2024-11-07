import { computed, Ref } from 'vue'
import { TemplateRef, unwrapEl } from '../../../utils/unwrapEl'

export type MaybeHTMLElementOrSelector = string | TemplateRef

export const useSelectorTemplateRef = (key: Ref<MaybeHTMLElementOrSelector>): Ref<HTMLElement | undefined> => {
  return computed(() => {
    if (typeof key?.value === 'string') {
      return document?.querySelector(key.value) as HTMLElement
    }

    return unwrapEl(key?.value)
  })
}
