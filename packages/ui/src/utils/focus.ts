const isHTMLElement = (el: unknown): el is HTMLElement => {
  return el instanceof HTMLElement
}

/**
 * Since `.focus()` does not dispatch native event, this method will dispatch it automatically
 * @emits focus
 */
export const focusElement = <T extends Element | undefined>(el: T) => {
  if (!el || !isHTMLElement(el)) { return }

  el.focus()
  el.dispatchEvent(new FocusEvent('focus', { bubbles: true }))
}

/**
 * Since `.blur()` does not dispatch native event, this method will dispatch it automatically
 * @emits blur
 */
export const blurElement = <T extends Element | undefined>(el: T) => {
  if (!el || !isHTMLElement(el)) { return }

  el.blur()
  el.dispatchEvent(new Event('blur', { bubbles: true }))
}

/**
 * Focus first focusable child of parent.
 *
 * @example Used to give focus back to menu after closing submenu.
 */
export const focusFirstFocusableChild = (el: HTMLElement) => {
  if (el.tabIndex !== -1) {
    focusElement(el)
    return
  }

  const focusable = el.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
  if (focusable) { focusElement(focusable) }
}
