import { useDocument } from './useDocument'
import { useWindow } from './useWindow'

const TAB_KEYCODE = 9
const FOCUSABLE_ELEMENTS_SELECTOR = ':where(a, button, input, textarea, select):not([disabled]), *[tabindex]'
let trapInEl: HTMLElement | null = null

export const useTrapFocus = () => {
  const document = useDocument()
  const window = useWindow()

  let focusableElements: HTMLElement[] = []
  let firstFocusableElement: HTMLElement | null = null
  let lastFocusableElement: HTMLElement | null = null
  let isFocusTrapped = false

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

    if (!isFocusTrapped) {
      isFocusTrapped = true

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
    trapInEl = el

    freeFocus()
    trapFocus()
  }

  const trapFocus = () => {
    if (!trapInEl) {
      return
    }

    focusableElements = Array.from(trapInEl.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR))
    firstFocusableElement = focusableElements[0]
    lastFocusableElement = focusableElements[focusableElements.length - 1]

    window.value?.addEventListener('keydown', onKeydown)
  }
  const freeFocus = () => {
    focusableElements = []
    firstFocusableElement = null
    lastFocusableElement = null
    isFocusTrapped = false

    window.value?.removeEventListener('keydown', onKeydown)
  }

  return {
    trapFocus,
    freeFocus,
    trapFocusIn,
  }
}
