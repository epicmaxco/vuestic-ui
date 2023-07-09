import { Component, DefineComponent, Ref, unref } from 'vue'
import { useEvent } from './useEvent'
import { unwrapEl } from '../utils/unwrapEl'

const FOCUSABLE_ELEMENTS_SELECTOR = ':where(a, button, input, textarea, select):not([disabled]), *[tabindex]'

// ATTENTION: Be careful with this composable, it is not tested well.
// It is not used in any component yet. (Maybe you should use useTrapFocus() instead?)

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
  onFocusOut: () => void,
) => {
  let previouslyClicked = false
  let previouslyFocusedElement: HTMLElement | null = null

  const isChildInParent = (child: Node | null) => {
    if (!child) { return false }

    // Window is a parent of all elements and it also do not implement Node interface,
    // so it can not be used in `contains` method.
    if (child instanceof Window) { return false }

    const parentElement = unwrapEl(unref(el))

    return parentElement?.contains(child)
  }

  // TODO: this event will be added to every component, it must be applied only once
  useEvent('keydown', (e) => {
    if (e.code === 'Tab') {
      if (!isChildInParent(document.activeElement)) {
        return
      }

      // TODO: not sure how this impact performance
      // but we need this, otherwise focus will be moved to browser's address bar
      const focusableChildren = document.body?.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR)
      if (!focusableChildren) { return }

      if (e.shiftKey) {
        if (focusableChildren[0] === document.activeElement) {
          e.preventDefault()
          document.body.focus()
          onFocusOut()
        }
        return
      }

      if (focusableChildren[focusableChildren.length - 1] === document.activeElement) {
        e.preventDefault()
        document.body.focus()
        onFocusOut()
      }
    }
  })

  useEvent('click', () => {
    previouslyClicked = true
  }, true)

  useEvent('blur', (e) => {
    if (!previouslyClicked) {
      if (!isChildInParent(e.target as Node) && isChildInParent(previouslyFocusedElement)) {
        onFocusOut()
      }
    }

    previouslyClicked = false
    previouslyFocusedElement = e.target as HTMLElement
  }, true)
}
