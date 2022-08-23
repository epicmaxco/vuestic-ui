import { computed, Ref, unref, watchPostEffect } from 'vue'

import { mapObject } from '../utils/map-object'
import { useDomRect } from './useDomRect'
import { useClientOnly } from './useClientOnly'

export type PlacementPosition = 'top' | 'bottom' | 'left' | 'right'
export type PlacementAlignment = 'start' | 'end' | 'center'
export type Placement = PlacementPosition | 'auto' | `${PlacementPosition}-${PlacementAlignment}`
export type Offset = number | [number, number]

type Coords = { x: number, y: number }
type AlignCoords = { main: number, cross: number }

export const placementsPositions = ['top', 'bottom', 'left', 'right']
  .reduce((acc, position) => [...acc, position, `${position}-start`, `${position}-end`, `${position}-center`], ['auto'] as string[])

const coordsToCss = ({ x, y }: Coords) => ({ left: `${x}px`, top: `${y}px` })

const parsePlacement = (placement: Placement) => {
  let [position, align] = placement.split('-') as [PlacementPosition | 'auto', PlacementAlignment | undefined]
  if (position === 'auto') {
    position = 'bottom'
  }

  return { position, align: align || 'center' }
}

const parseOffset = (offset: Offset): AlignCoords => {
  return Array.isArray(offset) ? { main: offset[0], cross: offset[1] } : { main: offset, cross: 0 }
}

const calculateContentAlignment = (align: PlacementAlignment, anchorStart: number, anchorSize: number, contentSize: number) => {
  if (align === 'start') { return anchorStart }
  if (align === 'end') { return anchorStart + anchorSize - contentSize }

  return anchorStart + (anchorSize - contentSize) / 2
}

const calculateContentCoords = (placement: Placement, anchor: DOMRect, content: DOMRect) => {
  const { position, align } = parsePlacement(placement)

  const alignmentX = calculateContentAlignment(align, anchor.left, anchor.width, content.width)
  const alignmentY = calculateContentAlignment(align, anchor.top, anchor.height, content.height)

  switch (position) {
    case 'top': return { x: alignmentX, y: anchor.top - content.height }
    case 'left': return { y: alignmentY, x: anchor.left - content.width }
    case 'right': return { y: alignmentY, x: anchor.right }
    case 'bottom':
    default: return { x: alignmentX, y: anchor.bottom }
  }
}

const calculateOffsetCoords = (placement: Placement, offset: Offset): Coords => {
  const { position } = parsePlacement(placement)
  const { main, cross } = parseOffset(offset)

  switch (position) {
    case 'left': return { y: cross, x: -main }
    case 'right': return { y: cross, x: main }
    case 'top': return { y: -main, x: cross }
    case 'bottom':
    default: return { y: main, x: cross }
  }
}

/** Returns how much content overflow */
const calculateContentOverflow = (coords: Coords, content: DOMRect, viewport: DOMRect) => {
  const xMax = viewport.right
  const yMax = viewport.bottom
  const xMin = viewport.left
  const yMin = viewport.top

  return {
    top: Math.max(yMin - coords.y, 0),
    bottom: Math.max((coords.y + content.height) - yMax, 0),
    left: Math.max(xMin - coords.x, 0),
    right: Math.max((coords.x + content.width) - xMax, 0),
  }
}

const clamp = (min: number, v: number, max: number) => Math.max(Math.min(v, max), min)

const calculateClipToEdge = (coords: Coords, offsetCoords: Coords, content: DOMRect, anchor: DOMRect, viewport: DOMRect) => {
  const { top, bottom, left, right } = calculateContentOverflow(coords, content, viewport)

  // Add left overflow, sub right overflow so content always stick to edge
  const x = coords.x - right + left
  const y = coords.y - bottom + top

  const { x: offsetX, y: offsetY } = offsetCoords

  return {
    // Clamp content position near anchor, so any content edge should touch anchor edge
    x: clamp(anchor.left + offsetX - content.width, x, anchor.right + offsetX),
    y: clamp(anchor.top + offsetY - content.height, y, anchor.bottom + offsetY),
  }
}

const getAutoPlacement = (placement: Placement, coords: Coords, content: DOMRect, viewport: DOMRect): Placement => {
  const { position, align } = parsePlacement(placement)
  const overflow = calculateContentOverflow(coords, content, viewport)

  const newPlacements = {
    top: ['bottom', align].join('-') as Placement,
    bottom: ['top', align].join('-') as Placement,
    right: ['left', align].join('-') as Placement,
    left: ['right', align].join('-') as Placement,
  }

  return overflow[position] ? newPlacements[position] : placement
}

const findFirstRelativeParent = (el: Element | null) => {
  while (el) {
    // TODO: Remove the el.style.position after fix of this issue: https://github.com/nuxt/framework/issues/3587
    // TODO: Remove from the va-dropdown.vue the inline style (position: relative)
    const positionValue = window.getComputedStyle(el).getPropertyValue('position') ||
      (el as HTMLElement).style.position

    if (positionValue === 'relative') { return el }

    el = el.parentElement
  }

  return document.body
}

export type usePopoverOptions = {
  keepAnchorWidth?: boolean,
  autoPlacement?: boolean,
  stickToEdges?: boolean,
  placement: Placement,
  offset?: Offset,
  /** Root element selector */
  root?: string | HTMLElement,
  viewport?: HTMLElement,
}

/**
 * Updates `contentRef` css, make it position fixed and moves relative to `anchorRef`
 * @param options make options reactive if you want popover to react on options change.
 */
export const useDropdown = (
  anchorRef: Ref<HTMLElement | undefined>,
  contentRef: Ref<HTMLElement | undefined>,
  options: usePopoverOptions | Ref<usePopoverOptions>,
) => {
  const documentRef = useClientOnly(() => document)
  const rootRef = computed(() => {
    if (!documentRef.value) { return undefined }

    const { root } = unref(options)

    if (root) {
      let el
      if (typeof root === 'string') {
        el = documentRef.value.querySelector(root)
      } else {
        el = root
      }
      if (!el) { return documentRef.value.body }
      return findFirstRelativeParent(el)
    }

    return documentRef.value.body
  })
  const { domRect: anchorDomRect } = useDomRect(anchorRef)
  const { domRect: contentDomRect } = useDomRect(contentRef)

  const css = {
    width: 'max-content',
    position: 'absolute',
  }

  watchPostEffect(() => {
    if (!rootRef.value || !anchorDomRect.value || !contentDomRect.value) { return }

    const { placement, offset, keepAnchorWidth, autoPlacement, stickToEdges } = unref(options)

    // calculate coords (x and y) of content left-top corner
    let coords = calculateContentCoords(placement, anchorDomRect.value, contentDomRect.value)

    let offsetCoords: Coords = { x: 0, y: 0 }
    if (offset) {
      offsetCoords = calculateOffsetCoords(placement, offset)
      coords = mapObject(coords, (c, key) => c + offsetCoords[key])
    }

    const rootRect = rootRef.value.getBoundingClientRect()
    const viewportRect = unref(options).viewport?.getBoundingClientRect() ?? rootRect

    if (autoPlacement) {
      const newPlacement = getAutoPlacement(placement, coords, contentDomRect.value, viewportRect)
      if (newPlacement !== placement) {
        coords = calculateContentCoords(newPlacement, anchorDomRect.value, contentDomRect.value)

        if (offset) {
          offsetCoords = calculateOffsetCoords(newPlacement, offset)
          coords = mapObject(coords, (c, key) => c + offsetCoords[key])
        }
      }
    }

    if (stickToEdges) {
      coords = calculateClipToEdge(coords, offsetCoords, contentDomRect.value, anchorDomRect.value, viewportRect)
    }

    coords.x -= rootRect.x
    coords.y -= rootRect.y

    if (contentRef.value) {
      let widthCss = {}
      if (keepAnchorWidth) {
        const { width } = anchorDomRect.value
        widthCss = { width: `${width}px`, maxWidth: `${width}px` }
      }

      Object.assign(contentRef.value.style, {
        ...css,
        ...coordsToCss(coords),
        ...widthCss,
      })
    }
  })

  return {
    anchorDomRect,
    contentDomRect,
  }
}
