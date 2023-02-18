/**
 * Since `.focus()` does not dispatch native event, this method will dispatch it automatically
 * @emits focus
 */
export const focusElement = <T extends HTMLElement | undefined>(el: T) => {
  if (!el) { return }

  el.focus()
  el.dispatchEvent(new Event('focus', { bubbles: true }))
}

/**
 * Since `.blur()` does not dispatch native event, this method will dispatch it automatically
 * @emits blur
 */
export const blurElement = <T extends HTMLElement | undefined>(el: T) => {
  if (!el) { return }

  el.blur()
  el.dispatchEvent(new Event('blur', { bubbles: true }))
}
