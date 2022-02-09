import { computed, Ref, watch } from 'vue'
import { useDomRect } from './useDomRect'

type PositionKeys = 'top' | 'bottom' | 'left' | 'right' | 'auto'

const getPlacementHorizontalAlignment = (anchor: DOMRect, content: DOMRect, placement?: 'start' | 'end' | 'center' | string) => {
  if (placement === 'start') {
    return {
      left: anchor.left,
    }
  } else if (placement === 'end') {
    return {
      right: window.innerWidth - anchor.right,
    }
  } else {
    return {
      left: anchor.left + anchor.width / 2,
      transform: 'translateX(-50%)',
    }
  }
}

const getPlacementVerticalAlignment = (anchor: DOMRect, content: DOMRect, placement?: 'start' | 'end' | 'center' | string) => {
  if (placement === 'start') {
    return {
      top: anchor.top,
    }
  } else if (placement === 'end') {
    return {
      bottom: window.innerHeight - anchor.bottom,
    }
  } else {
    return {
      top: anchor.top + anchor.height / 2,
      transform: 'translateY(-50%)',
    }
  }
}

const getAutoPlacement = (placement: PositionKeys, anchorRect: DOMRect, contentRect: DOMRect) => {
  if (anchorRect.top - contentRect.height <= 0) {
    return getPlacement('bottom', anchorRect, contentRect)
  }

  if (anchorRect.bottom + contentRect.height > window.innerHeight) {
    return getPlacement('top', anchorRect, contentRect)
  }

  if (anchorRect.left - contentRect.width <= 0) {
    return getPlacement('right', anchorRect, contentRect)
  }

  if (anchorRect.right + contentRect.width > window.innerWidth) {
    return getPlacement('left', anchorRect, contentRect)
  }

  return getPlacement(placement === 'auto' ? 'bottom' : placement, anchorRect, contentRect)
}

const getPlacement = (placement: PositionKeys, anchorRect: DOMRect, contentRect: DOMRect): {
  transform?: string
  left?: string | number,
  top?: string | number,
  right?: string | number,
  bottom?: string | number,
} => {
  const [position, alignment] = placement.split('-')

  if (position === 'bottom') {
    return {
      ...getPlacementHorizontalAlignment(anchorRect, contentRect, alignment),
      top: anchorRect.bottom,
    }
  } else if (position === 'top') {
    return {
      ...getPlacementHorizontalAlignment(anchorRect, contentRect, alignment),
      top: anchorRect.top - contentRect.height,
    }
  } else if (position === 'left') {
    return {
      ...getPlacementVerticalAlignment(anchorRect, contentRect, alignment),
      left: anchorRect.left - contentRect.width,
    }
  } else if (position === 'right') {
    return {
      ...getPlacementVerticalAlignment(anchorRect, contentRect, alignment),
      left: anchorRect.right,
    }
  }

  return getAutoPlacement(placement, anchorRect, contentRect)
}

const getPlacementCSS = (placement: PositionKeys, anchorRect: DOMRect, contentRect: DOMRect) => {
  const css = getPlacement(placement, anchorRect, contentRect)

  css.top += 'px'
  css.left += 'px'
  css.right += 'px'
  css.bottom += 'px'

  return css
}

export const usePopover = (
  anchorRef: Ref<HTMLElement | null | undefined>,
  contentRef: Ref<HTMLElement | null | undefined>,
  options: {
    keepAnchorWidth?: boolean,
    placement: PositionKeys
  },
) => {
  const { domRect: anchorDomRect } = useDomRect(anchorRef)
  const { domRect: contentDomRect } = useDomRect(contentRef)

  const updateContentCSS = () => {
    if (!anchorDomRect.value || !contentDomRect.value) { return }

    Object.assign(contentRef.value?.style, {
      ...getPlacementCSS(options.placement, anchorDomRect.value, contentDomRect.value),
      position: 'fixed',
    })

    if (options.keepAnchorWidth) {
      Object.assign(contentRef.value?.style, {
        width: anchorDomRect.value.width + 'px',
        maxWidth: anchorDomRect.value.width + 'px',
      })
    }
  }

  watch(anchorDomRect, updateContentCSS)
  watch(contentDomRect, updateContentCSS)

  return {
    anchorDomRect,
    contentDomRect,
  }
}
