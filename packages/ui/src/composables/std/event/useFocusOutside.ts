import { MaybeRef, Ref, unref } from 'vue'

import { useEvent } from './useEvent'
import { unwrapEl } from '../../../utils/unwrapEl'
import { MaybeArray, safeArray } from '../../../utils/safe-array'
import { isElementChild } from '../../../utils/is-element-child'

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
      return el && isElementChild(el, focusTarget)
    })

    if (!isFocusInside) {
      cb(focusTarget)
    }
  }, true)
}
