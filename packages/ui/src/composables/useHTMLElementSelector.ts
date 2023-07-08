import { computed, DefineComponent, Ref, unref } from 'vue'
import { unwrapEl } from '../utils/unwrapEl'

export type MaybeHTMLElementOrSelector = string | HTMLElement | DefineComponent | undefined

export const useHTMLElementSelector = (key: Ref<MaybeHTMLElementOrSelector | undefined>): Ref<HTMLElement | undefined> => {
  return computed(() => {
    if (typeof key?.value === 'string') {
      return document.querySelector(key.value) as HTMLElement
    }

    return unwrapEl(key?.value)
  })
}
