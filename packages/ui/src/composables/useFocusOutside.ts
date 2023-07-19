import { Ref, unref } from 'vue'

import { useEvent } from './useEvent'
import { unwrapEl } from '../utils/unwrapEl'

const checkIfElementChild = (
  parent: HTMLElement,
  child: HTMLElement | Window | null | undefined,
): boolean => {
  if (!child) {
    return false
  }
  if (child instanceof Window) {
    return false
  }
  if (child.parentElement === parent) {
    return true
  }

  return parent.contains(child)
}

type MaybeRef<T> = T | Ref<T>;
type MaybeArray<T> = T | T[];

const safeArray = <T>(a: MaybeArray<T>) => (Array.isArray(a) ? a : [a])

export const useFocusOutside = (
  elements: MaybeArray<MaybeRef<HTMLElement | undefined>>,
  cb: (el: HTMLElement) => void,
  options: {
    onlyKeyboard?: boolean;
  } = {},
) => {
  let previouslyClicked = false
  if (options.onlyKeyboard) {
    useEvent('mousedown', (e) => {
      previouslyClicked = true
      setTimeout(() => {
        previouslyClicked = false
      }, 200)
    }, true)
  }

  useEvent('focus', (event) => {
    if (options.onlyKeyboard && previouslyClicked) {
      return
    }

    const focusTarget = event.target as HTMLElement

    if ((event.target as HTMLElement).shadowRoot) {
      return
    }

    const isFocusInside = safeArray(elements).some((element) => {
      const el = unwrapEl(unref(element))
      return el && checkIfElementChild(el, focusTarget)
    })

    if (!isFocusInside) {
      cb(focusTarget)
    }
  }, true)
}
