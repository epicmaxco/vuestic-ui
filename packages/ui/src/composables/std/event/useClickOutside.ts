import { MaybeRef, Ref, unref } from 'vue'

import { useEvent } from './useEvent'
import { findTeleportedFrom } from '../internal/useTeleported'
import { unwrapEl } from '../../../utils/unwrapEl'
import { MaybeArray, safeArray } from '../../../utils/safe-array'
import { isElementChild } from '../../../utils/is-element-child'

export const useClickOutside = (elements: MaybeArray<MaybeRef<HTMLElement | undefined>>, cb: (el: HTMLElement) => void) => {
  useEvent('mousedown', (event: MouseEvent) => {
    const clickTarget = event.target as HTMLElement

    if ((event.target as HTMLElement).shadowRoot) {
      return
    }

    // Handle floating UI teleport
    const teleportParent = findTeleportedFrom(clickTarget)

    const isClickInside = safeArray(elements).some((element) => {
      const el = unwrapEl(unref(element))

      if (!el) { return false }

      if (!teleportParent) { return isElementChild(el, clickTarget) }

      return isElementChild(el, clickTarget) || isElementChild(el, teleportParent)
    })

    if (!isClickInside) { cb(clickTarget) }
  }, true)
}
