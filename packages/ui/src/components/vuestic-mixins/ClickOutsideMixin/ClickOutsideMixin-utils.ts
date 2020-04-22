export const clickedRootScrollbar = (event: MouseEvent) => {
  return (
    document.documentElement.clientWidth < event.clientX ||
    document.documentElement.clientHeight < event.clientY
  )
}

export const ownerDocument = (node?: Element) => {
  return (node && node.ownerDocument) || document
}

export const isLeftClickEvent = (event: MouseEvent) => {
  return event.button === 0
}

export const isModifiedEvent = (event: MouseEvent) => {
  return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
}

// HTML DOM and SVG DOM may have different support levels,
// so we need to check on context instead of a document root element.
export const contains = (context: Element, node: Element) => {
  if (context.contains) {
    return context.contains(node)
  }

  if (context.compareDocumentPosition) {
    return context === node || !!(context.compareDocumentPosition(node) & 16)
  }

  return false
}

const __DEV__ = process.env.NODE_ENV !== 'production'

export const handleMouseCapture = (e: MouseEvent, target: Element): boolean => {
  if (__DEV__) {
    if (!target) {
      throw new Error(
        'ClickOutside captured a click event but does not have a target to compare it to.',
      )
    }
  }

  let insideDom

  // If not enough, can use https://github.com/DieterHolvoet/event-propagation-path/blob/master/propagationPath.js
  if (e.composedPath) {
    insideDom = e.composedPath().indexOf(target) > -1
  } else {
    const doc = ownerDocument(target)
    // TODO remove dead logic https://caniuse.com/#search=composedPath.
    // `doc.contains` works in modern browsers but isn't supported in IE 11:
    // https://github.com/timmywil/panzoom/issues/450
    // https://github.com/videojs/video.js/pull/5872
    insideDom =
      !(
        doc.documentElement && doc.documentElement.contains(e.target as Node)
      ) || contains(target, e.target as Element)
  }

  return !!(!target || isModifiedEvent(e) || !isLeftClickEvent(e) || insideDom)
}

export const listen = <K extends keyof HTMLElementEventMap>(
  node: HTMLElement | Document | Window,
  eventName: K,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
) => {
  node.addEventListener(eventName, handler, options)
  return () => {
    node.removeEventListener(eventName, handler, options)
  }
}
