import { onBeforeUnmount, onMounted, Ref, unref, watch } from 'vue'
import { useDomRect } from './useDomRect'
import { mapObject } from '../utils/map-object'

export type PlacementPosition = 'top' | 'bottom' | 'left' | 'right'
export type PlacementAlignment = 'start' | 'end' | 'center'
export type Placement = PlacementPosition | 'auto' | `${PlacementPosition}-${PlacementAlignment}`
export type Offset = number | [number, number]
type Coords = { top: number, left: number }
type NormalizedOffset = { main: number, cross: number }
type CalculatedCoords = {
  left?: number,
  top?: number,
  right?: number,
  bottom?: number,
}

const normalizedOffset = (offset: Offset): NormalizedOffset => {
  if (Array.isArray(offset)) {
    return { main: offset[0], cross: offset[1] }
  }

  return { main: offset, cross: 0 }
}

const normalizedPlacement = (placement: Placement) => {
  const [position, align] = placement.split('-') as [PlacementPosition, PlacementAlignment | undefined]

  return { position, align: align || 'center' }
}

const clampToEdges = (placement: Placement, coords: CalculatedCoords, anchorRect: DOMRect, contentRect: DOMRect) => {
  const { position } = normalizedPlacement(placement)
  const { top, bottom, left, right } = coords

  if (position === 'bottom' || position === 'top') {
    const leftOverflow = (left && left < 0) || (right && right + contentRect.width > window.innerWidth)
    const rightOverflow = (right && right < 0) || (left && left + contentRect.width > window.innerWidth)

    if (leftOverflow) {
      return { top, bottom, left: Math.min(anchorRect.right - contentRect.width, 0) }
    }

    if (rightOverflow) {
      return { top, bottom, right: Math.min(window.innerWidth - anchorRect.left - contentRect.width, 0) }
    }
  }

  if (position === 'right' || position === 'left') {
    const topOverflow = (top && top < 0) || (bottom && bottom + contentRect.height > window.innerHeight)
    const bottomOverflow = (bottom && bottom < 0) || (top && top + contentRect.height > window.innerHeight)

    if (topOverflow) {
      return { left, right, top: Math.min(anchorRect.bottom - contentRect.height, 0) }
    }

    if (bottomOverflow) {
      return { left, right, bottom: Math.min(window.innerHeight - anchorRect.top - contentRect.height, 0) }
    }
  }

  return { top, bottom, right, left }
}

const calculateOverflow = (anchorRect: DOMRect, contentRect: DOMRect, offsetCoords: Coords = { top: 0, left: 0 }) => {
  return {
    top: -(anchorRect.top - offsetCoords.top - contentRect.height),
    left: -(anchorRect.left - offsetCoords.left - contentRect.width),
    right: (anchorRect.right + offsetCoords.left + contentRect.width) - window.innerWidth,
    bottom: (anchorRect.bottom + offsetCoords.top + contentRect.height) - window.innerHeight,
  }
}

const detectOverflow = (anchorRect: DOMRect, contentRect: DOMRect, offsetCoords: Coords = { top: 0, left: 0 }) => {
  return mapObject(calculateOverflow(anchorRect, contentRect, offsetCoords), (overflow) => overflow >= 0)
}

const calculateOffsetCords = (placement: Placement, offset: Offset) => {
  const { position } = normalizedPlacement(placement)

  const { main, cross } = normalizedOffset(offset)

  if (position === 'top') {
    return { top: -main, left: cross, bottom: 0, right: cross }
  }

  if (position === 'right') {
    return { top: cross, left: main, bottom: cross, right: 0 }
  }

  if (position === 'left') {
    return { top: cross, left: -main, bottom: cross, right: 0 }
  }

  return { top: main, left: cross, bottom: 0, right: cross }
}

const calculateHorizontalCoords = (align: PlacementAlignment, anchor: DOMRect, content: DOMRect) => {
  if (align === 'start') { return { left: anchor.left } }

  if (align === 'end') { return { right: window.innerWidth - anchor.right } }

  return { left: anchor.left + anchor.width / 2 - content.width / 2 }
}

const calculateVerticalCoords = (align: PlacementAlignment, anchor: DOMRect, content: DOMRect) => {
  if (align === 'start') { return { top: anchor.top } }

  if (align === 'end') { return { bottom: window.innerHeight - anchor.bottom } }

  return { top: anchor.top + anchor.height / 2 - content.height / 2 }
}

const calculateCoords = (placement: Placement, anchor: DOMRect, content: DOMRect): CalculatedCoords => {
  const { position, align } = normalizedPlacement(placement)

  if (position === 'top') {
    return {
      ...calculateHorizontalCoords(align, anchor, content),
      top: anchor.top - content.height,
    }
  }
  if (position === 'left') {
    return {
      ...calculateVerticalCoords(align, anchor, content),
      left: anchor.left - content.width,
    }
  }
  if (position === 'right') {
    return {
      ...calculateVerticalCoords(align, anchor, content),
      left: anchor.right,
    }
  }

  // if position === 'bottom'
  return {
    ...calculateHorizontalCoords(align, anchor, content),
    top: anchor.bottom,
  }
}

const getAutoPlacement = (placement: Placement, anchorRect: DOMRect, contentRect: DOMRect, offset: Offset): Placement => {
  const offsetCords = calculateOffsetCords(placement, offset)
  const { top, bottom, left, right } = detectOverflow(anchorRect, contentRect, offsetCords)
  const { position, align } = normalizedPlacement(placement)

  if (top && position === 'top') { return ['bottom', align].join('-') as Placement }
  if (bottom && position === 'bottom') { return ['top', align].join('-') as Placement }
  if (right && position === 'right') { return ['left', align].join('-') as Placement }
  if (left && position === 'left') { return ['right', align].join('-') as Placement }

  return placement
}

export type usePopoverOptions = {
  keepAnchorWidth?: boolean,
  autoPlacement?: boolean,
  stickToEdges?: boolean,
  placement: Placement,
  offset?: Offset
}

/**
 * Updates `contentRef` css, make it position fixed and moves relative to `anchorRef`
 * @param options make options reactive if you want popover to react on options change.
 */
export const usePopover = (
  anchorRef: Ref<HTMLElement | null | undefined>,
  contentRef: Ref<HTMLElement | null | undefined>,
  options: usePopoverOptions | Ref<usePopoverOptions>,
) => {
  const { domRect: anchorDomRect } = useDomRect(anchorRef)
  const { domRect: contentDomRect } = useDomRect(contentRef)

  const updateContentCSS = () => {
    if (!anchorDomRect.value || !contentDomRect.value) { return }

    let { placement, keepAnchorWidth, offset, autoPlacement, stickToEdges } = unref(options)

    if (autoPlacement) {
      placement = getAutoPlacement(placement, anchorDomRect.value, contentDomRect.value, offset || 0)
    }

    let coords = calculateCoords(placement, anchorDomRect.value, contentDomRect.value)

    if (offset) {
      const offsetCoords = calculateOffsetCords(placement, offset)

      coords = mapObject(coords, (coord, key) => coord + offsetCoords[key as PlacementPosition])
    }

    if (stickToEdges) {
      coords = clampToEdges(placement, coords, anchorDomRect.value, contentDomRect.value)
    }

    const coordsCss = mapObject(coords, (c) => c === undefined ? 'unset' : c + 'px')

    Object.assign(contentRef.value?.style, {
      top: 'unset',
      bottom: 'unset',
      left: 'unset',
      right: 'unset',
      width: 'max-content',
      position: 'fixed',
      ...coordsCss,
    })

    if (keepAnchorWidth) {
      Object.assign(contentRef.value?.style, {
        width: anchorDomRect.value.width + 'px',
        maxWidth: anchorDomRect.value.width + 'px',
      })
    }
  }

  watch(anchorDomRect, updateContentCSS)
  watch(contentDomRect, updateContentCSS)
  watch(options, updateContentCSS, { deep: true })

  onMounted(() => { window.addEventListener('resize', updateContentCSS) })
  onBeforeUnmount(() => { window.removeEventListener('resize', updateContentCSS) })

  return {
    anchorDomRect,
    contentDomRect,
  }
}
