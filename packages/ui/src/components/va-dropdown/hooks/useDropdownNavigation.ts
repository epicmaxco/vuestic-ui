import { Ref } from 'vue'
import { useEvent } from '../../../composables'

const isTyping = (e: Event) => {
  const target = e.target as HTMLElement
  if (!(target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) { return false }
  if (target.attributes.getNamedItem('readonly')) { return false }
  return true
}

const openKey = ['ArrowDown', 'ArrowUp', 'Enter', 'Space']

export const useAnchorKeyboardNavigation = (anchorRef: Ref<HTMLElement | undefined>, isOpened: Ref<boolean>) => {
  useEvent('keydown', (e) => {
    if (e.key === 'Esc') {
      isOpened.value = false
      return
    }

    if (isTyping(e)) { return }

    if (!openKey.includes(e.key)) { return }

    isOpened.value = !isOpened.value
    e.preventDefault()
  }, anchorRef)
}

type MouseEventName = 'mouseleave' | 'mouseenter' | 'click' | 'dblclick' | 'contextmenu'
export const useAnchorMouseNavigation = (
  anchorRef: Ref<HTMLElement | undefined>,
  listeners: Record<MouseEventName, (e: MouseEvent) => any>,
) => {
  useEvent(['click', 'contextmenu', 'dblclick'], (e: MouseEvent) => {
    if (isTyping(e)) { return }

    listeners[e.type as MouseEventName](e)
  }, anchorRef)

  useEvent(['mouseleave', 'mouseenter'], (e: MouseEvent) => {
    listeners[e.type as MouseEventName](e)
  }, anchorRef)
}
