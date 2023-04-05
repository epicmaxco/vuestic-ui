import { VNode, h, Teleport, Suspense, Comment, Fragment, Text, Slot } from 'vue'

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
    return toNode(v.children[0], attrs)
  }

  return h(v, attrs)
}

/** Renders node, apply slot bind and attributes to actual HTML Node, not vue pseudo elements */
export const renderSlotNode = (slot: Slot | undefined, slotBind: any = {}, nodeAttributes: NodeAttributes = {}) => {
  const children = slot?.(slotBind)

  if (!children) { return null }

  // Convert to Node first non-comment child or first child
  return toNode(children.find((v) => v.type !== Comment) || children[0], nodeAttributes)
}
