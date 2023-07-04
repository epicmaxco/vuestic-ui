import { Component, DefineComponent, Ref, unref } from 'vue'
import { useEvent } from './useEvent'
import { unwrapEl } from '../utils/unwrapEl'

/**
 * Call onFocusOut when focus is out of `el` or any of his children using keyboard (or programmatically).
 *
 * @param el element to watch for focus out
 * @param onFocusOut callback to call when focus is out of `el` or any of his children
 *
 * @example
 * Can be used in elements with dropdown or modal, so when user changes focus to other element with `tab` key, dropdown will be closed.
 */
export const useKeyboardFocusOut = (
  el: Ref<HTMLElement | DefineComponent | undefined | Component>,
  onFocusOut: (e: FocusEvent) => void,
) => {
  let previouslyClicked = false
  let previouslyFocusedElement: HTMLElement | null = null

  const isChildInParent = (child: Node | null) => {
    if (!child) { return false }

    // Window is a parent of all elements and it also do not implement Node interface,
    // so it can not be used in `contains` method.
    if (child instanceof Window) { return false }

    const parentElement = unwrapEl(unref(el))

    return parentElement?.contains(previouslyFocusedElement)
  }

  useEvent('click', () => {
    previouslyClicked = true
  }, true)

  useEvent('blur', (e) => {
    if (!previouslyClicked) {
      if (!isChildInParent(e.target as Node) && isChildInParent(previouslyFocusedElement)) {
        onFocusOut(e)
      }
    }

    previouslyClicked = false
    previouslyFocusedElement = e.target as HTMLElement
  }, true)
}
