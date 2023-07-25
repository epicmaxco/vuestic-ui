import { useCurrentComponentId } from './useCurrentComponentId'

export const TELEPORT_FROM_ATTR = 'data-va-teleported-from'
export const TELEPORT_ATTR = 'data-va-teleported'

export const findTeleportedFrom = (el: HTMLElement | undefined | null): HTMLElement | null => {
  if (!el) { return null }

  const teleportId = el.getAttribute(TELEPORT_ATTR)

  if (teleportId === null) { return findTeleportedFrom(el.parentElement) }

  return document.querySelector<HTMLElement>(`[${TELEPORT_FROM_ATTR}="${teleportId}"]`)
}

/**
 * Used in components, which have something to do with Teleport.
 * You need to add `teleportFromAttrs` to the root element of the component,
 * and `teleportedAttrs` to the element, which is teleported.
 *
 * This way you can find the original element, which was teleported from.
 *
 * @notice it is used in `useClickOutside` to track from where teleported originated from.
 */
export const useTeleported = () => {
  const componentId = useCurrentComponentId()

  return {
    teleportFromAttrs: {
      [TELEPORT_FROM_ATTR]: componentId,
    },
    teleportedAttrs: {
      [TELEPORT_ATTR]: componentId,
    },
    findTeleportedFrom,
  }
}
