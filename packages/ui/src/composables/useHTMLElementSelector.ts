import { extractHTMLElement } from './useHTMLElement'
import { computed, DefineComponent, Ref, unref } from 'vue'

export type MaybeHTMLElementOrSelector = string | HTMLElement | DefineComponent | undefined

export const useHTMLElementSelector = (key: Ref<MaybeHTMLElementOrSelector | undefined>): Ref<HTMLElement> => {
  return computed(() => {
    if (typeof key?.value === 'string') {
      return document.querySelector(key.value) as HTMLElement
    }

    return extractHTMLElement(key?.value)
  })
}
