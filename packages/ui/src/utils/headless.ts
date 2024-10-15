import { VNode, h, Teleport, Suspense, Comment, Fragment, Text, Slot, normalizeClass } from 'vue'

type NodeAttributes = Record<string, any>

const toNode = (v: any, attrs: NodeAttributes): VNode | null => {
  if (!v) { return null }

  if (!('type' in v) || v.type === Text || typeof v === 'string') {
    return h('div', attrs, v)
  }

  if (v.type === Comment) {
    return v
  }

  if ('$el' in v) {
    return toNode(v.$el, attrs)
  }

  if ((v.type as any) === Suspense) {
    // Suspense is not supported, we just return default content. I'm not sure
    // how to check if Suspense is ready to show default content instead of fallback.
    // Since Suspense is still experimental let's just ignore it for now.
    return h(v.ssContent, attrs) // TODO: Render decide when render fallback
  }

  if ((v.type as any) === Teleport) {
    if (v.children === null) { return v }

    const anchor = toNode(v.children[0], attrs)

    if (anchor) {
      v.children[0] = h(anchor, attrs)
    }
    return v
  }

  if (v.type === Fragment) {
    if (v.children === null) { return v }
    if (v.children.length === 1) { return h(Fragment, v.props, [toNode(v.children[0], attrs)]) }
    return h('div', attrs, v)
  }

  if (typeof v.type.render === 'function') {
    const component = h(v, attrs)

    if (Array.isArray(component.children) && component.children.length > 1) {
      return h('div', attrs, component.children)
    }
  }

  return h(v, attrs)
}

/** Renders node, apply slot bind and attributes to actual HTML Node, not vue pseudo elements */
export const renderSlotNode = (slot: Slot | undefined, slotBind: any = {}, nodeAttributes: NodeAttributes = {}) => {
  const children = slot?.(slotBind)

  if (!children) { return null }

  const nonCommentChildren = children.filter((v) => v.type !== Comment)

  if (nonCommentChildren.length === 0) { return null }
  if (nonCommentChildren.length === 1) { return toNode(nonCommentChildren[0], nodeAttributes) }

  return h('div', {
    ...nodeAttributes,
    class: normalizeClass([nodeAttributes.class, 'va-headless-wrapper']),
  }, children)
}

export const renderSlotNodes = (slot: Slot | undefined, slotBind: any = {}, nodeAttributes: NodeAttributes = {}) => {
  const children = slot?.(slotBind)

  if (!children) { return null }

  // Convert to Node first non-comment child or first child
  return children.map((v) => toNode(v, nodeAttributes))
}
