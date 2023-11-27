import { Ref } from 'vue'
import { useEvent } from '../../../composables'
import { focusElement } from './../../../utils/focus'

const NON_DISABLED_MENU_ITEM_SELECTOR = '[role="menuitem"]:not([aria-disabled="true"])'
const FOCUSED_MENU_ITEM_SELECTOR = '[role="menuitem"]:focus'

export const makeMenuItemAttributes = (options: { disabled?: boolean }) => ({
  role: 'menuitem',
  tabindex: -1,
  'aria-disabled': Boolean(options.disabled),
})

export const makeMenuContainerAttributes = () => ({
  role: 'menu',
  tabindex: 0,
})

export const useMenuKeyboardNavigation = (container: Ref<HTMLElement | undefined>) => {
  useEvent('keydown', ({ key }) => {
    if (!container.value) { return }

    const items = container.value.querySelectorAll(NON_DISABLED_MENU_ITEM_SELECTOR)
    const focusedItem = container.value.querySelector(FOCUSED_MENU_ITEM_SELECTOR)

    if (!items.length) { return }

    if (!focusedItem) {
      const firstItem = container.value.querySelector(NON_DISABLED_MENU_ITEM_SELECTOR)
      if (firstItem) { focusElement(firstItem) }
      return
    }

    if (key === 'ArrowDown' || key === 'ArrowRight') {
      const focusedElementIndex = Array.from(items).indexOf(focusedItem)
      focusElement(items[focusedElementIndex + 1])
    }

    if (key === 'ArrowUp' || key === 'ArrowLeft') {
      const focusedElementIndex = Array.from(items).indexOf(focusedItem)
      focusElement(items[focusedElementIndex - 1])
    }
  }, container)
}
