import { useAppGlobal, useDocument, useWindow } from './std'

const FOCUSABLE_ELEMENTS_SELECTOR = ':where(a, button, input, textarea, select):not([disabled]), *[tabindex]'

export const useTrapFocus = () => {
  const document = useDocument()
  const window = useWindow()

  const trapInEl = useAppGlobal<null | HTMLElement>('trapInEl', null)

  let focusableElements: HTMLElement[] = []
  let firstFocusableElement: HTMLElement | null = null
  let lastFocusableElement: HTMLElement | null = null

  const isFocusIn = (evt: Event) => {
    return trapInEl.value?.contains(evt.target as Node) || false
  }

  const focusFirstElement = () => {
    firstFocusableElement?.focus()
  }
  const focusLastElement = () => {
    lastFocusableElement?.focus()
  }

  const onKeydown = (evt: KeyboardEvent) => {
    const isTabPressed = evt.code === 'Tab'
    const isShiftPressed = evt.shiftKey

    if (!isTabPressed) {
      return
    }

    if (!isFocusIn(evt)) {
      evt.preventDefault()
      isShiftPressed ? focusLastElement() : focusFirstElement()

      return
    }

    if (document.value?.activeElement === lastFocusableElement && !isShiftPressed) {
      evt.preventDefault()
      focusFirstElement()
      return
    }

    if (document.value?.activeElement === firstFocusableElement && isShiftPressed) {
      evt.preventDefault()
      focusLastElement()
    }
  }

  const trapFocusIn = (el: HTMLElement) => {
    trapInEl.value = el

    freeFocus()
    trapFocus()
  }

  const trapFocus = () => {
    if (!trapInEl.value) {
      return
    }

    focusableElements = Array.from(trapInEl.value.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR))
    firstFocusableElement = focusableElements[0]
    lastFocusableElement = focusableElements[focusableElements.length - 1]

    window.value?.addEventListener('keydown', onKeydown)
  }
  const freeFocus = () => {
    focusableElements = []
    firstFocusableElement = null
    lastFocusableElement = null

    window.value?.removeEventListener('keydown', onKeydown)
  }

  return {
    trapFocus,
    freeFocus,
    trapFocusIn,
  }
}
