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

// https://github.com/react-bootstrap/dom-helpers/blob/master/src/contains.ts
// HTML DOM and SVG DOM may have different support levels,
// so we need to check on context instead of a document root element.
export const contains = (context: Element, node: Element) => {
  if (context.contains) {
    return context.contains(node)
  }

  if (context.compareDocumentPosition) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
    // 16 - node is contained by the context
    return context === node || !!(context.compareDocumentPosition(node) & 16)
  }

  return false
}

type ListenOptions<K> = {
  node: HTMLElement | Document | Window;
  eventName: K extends keyof HTMLElementEventMap ? K : never;
  handler: EventListenerOrEventListenerObject;
  options?: boolean | AddEventListenerOptions;
}

export const listen = ({
  node,
  eventName,
  handler,
  options,
}: ListenOptions<keyof HTMLElementEventMap>) => {
  node.addEventListener(eventName, handler, options)
  return () => {
    node.removeEventListener(eventName, handler, options)
  }
}
