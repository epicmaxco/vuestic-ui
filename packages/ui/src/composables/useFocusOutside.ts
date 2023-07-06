import { Ref, unref } from 'vue'

import { useCaptureEvent } from './useCaptureEvent'
import { extractHTMLElement } from './useHTMLElement'

const checkIfElementChild = (parent: HTMLElement, child: HTMLElement | Window | null | undefined): boolean => {
  if (!child) { return false }
  if (child instanceof Window) { return false }
  if (child.parentElement === parent) { return true }

  return parent.contains(child)
}

type MaybeRef<T> = T | Ref<T>
type MaybeArray<T> = T | T[]

const safeArray = <T>(a: MaybeArray<T>) => Array.isArray(a) ? a : [a]

export const useFocusOutside = (elements: MaybeArray<MaybeRef<HTMLElement | undefined>>, cb: (el: HTMLElement) => void) => {
  useCaptureEvent('focus', (event: MouseEvent) => {
    const focusTarget = event.target as HTMLElement

    if ((event.target as HTMLElement).shadowRoot) {
      return
    }

    const isFocusInside = safeArray(elements)
      .some((element) => {
        const el = extractHTMLElement(unref(element))
        return el && checkIfElementChild(el, focusTarget)
      })

    if (!isFocusInside) { cb(focusTarget) }
  })
}
