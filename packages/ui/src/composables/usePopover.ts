import { onBeforeUnmount, onMounted, Ref, unref, watch } from 'vue'
import { useDomRect } from './useDomRect'
import { mapObject } from '../utils/map-object'

export type PlacementPosition = 'top' | 'bottom' | 'left' | 'right'
export type PlacementAlignment = 'start' | 'end' | 'center'
export type Placement = PlacementPosition | 'auto' | `${PlacementPosition}-${PlacementAlignment}`
export type Offset = number | [number, number]

type Coords = { x: number, y: number }
type AlignCoords = { main: number, cross: number }

const coordsToCss = ({ x, y }: Coords) => ({ left: `${x}px`, top: `${y}px` })

const parsePlacement = (placement: Placement) => {
  const [position, align] = placement.split('-') as [PlacementPosition, PlacementAlignment | undefined]

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

  if (position === 'top') {
    return {
      x: calculateContentAlignment(align, anchor.left, anchor.width, content.width),
      y: anchor.top - content.height,
    }
  }
  if (position === 'left') {
    return {
      y: calculateContentAlignment(align, anchor.top, anchor.height, content.height),
      x: anchor.left - content.width,
    }
  }
  if (position === 'right') {
    return {
      y: calculateContentAlignment(align, anchor.top, anchor.height, content.height),
      x: anchor.right,
    }
  }

  // if position === 'bottom'
  return {
    x: calculateContentAlignment(align, anchor.left, anchor.width, content.width),
    y: anchor.bottom,
  }
}

const calculateOffsetCoords = (placement: Placement, offset: Offset): Coords => {
  const { position } = parsePlacement(placement)
  const { main, cross } = parseOffset(offset)

  if (position === 'top') {
    return { y: -main, x: cross }
  }

  if (position === 'right') {
    return { y: cross, x: main }
  }

  if (position === 'left') {
    return { y: cross, x: -main }
  }

  return { y: main, x: cross }
}

/** Returns how much content overflow */
const calculateContentOverflow = (coords: Coords, content: DOMRect, root: DOMRect) => {
  const xMax = root.right
  const yMax = root.bottom
  const xMin = root.left
  const yMin = root.top

  return {
    top: Math.max(yMin - coords.y, 0),
    bottom: Math.max((coords.y + content.height) - yMax, 0),
    left: Math.max(xMin - coords.x, 0),
    right: Math.max((coords.x + content.width) - xMax, 0),
  }
}

const clamp = (min: number, v: number, max: number) => Math.max(Math.min(v, max), min)

const calculateClipToEdge = (coords: Coords, content: DOMRect, anchor: DOMRect, root: DOMRect) => {
  const { top, bottom, left, right } = calculateContentOverflow(coords, content, root)

  // Add left overflow, sub right overflow so content always stick to edge
  const x = coords.x - right + left
  const y = coords.y - bottom + top

  return {
    // Clamp content position near anchor, so any content edge should touch anchor edge
    x: clamp(anchor.left - content.width, x, anchor.right + content.width),
    y: clamp(anchor.top - content.height, y, anchor.bottom + content.height),
  }
}

const getAutoPlacement = (placement: Placement, coords: Coords, content: DOMRect, root: DOMRect): Placement => {
  const { position, align } = parsePlacement(placement)
  const { top, bottom, left, right } = calculateContentOverflow(coords, content, root)

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
  offset?: Offset,
  root?: Element
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

    const css = {
      width: 'max-content',
      position: 'fixed',
    }

    const { placement, keepAnchorWidth, offset, autoPlacement, stickToEdges, root = document.documentElement } = unref(options)

    let coords = calculateContentCoords(placement, anchorDomRect.value, contentDomRect.value)

    if (offset) {
      const offsetCoords = calculateOffsetCoords(placement, offset)
      coords = mapObject(coords, (c, key) => c + offsetCoords[key])
    }

    if (keepAnchorWidth) {
      const { width } = anchorDomRect.value
      Object.assign(css, { width: `${width}px`, maxWidth: `${width}px` })
    }

    const rootRect = root.getBoundingClientRect()

    if (autoPlacement) {
      const newPlacement = getAutoPlacement(placement, coords, contentDomRect.value, rootRect)
      if (newPlacement !== placement) {
        coords = calculateContentCoords(newPlacement, anchorDomRect.value, contentDomRect.value)
      }
    }

    if (stickToEdges) {
      coords = calculateClipToEdge(coords, contentDomRect.value, anchorDomRect.value, rootRect)
    }

    Object.assign(contentRef.value?.style, {
      ...css,
      ...coordsToCss(coords),
    })
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
