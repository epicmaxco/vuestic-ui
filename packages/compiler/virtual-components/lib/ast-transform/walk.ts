import { TemplateChildNode, RootNode, ElementNode, NodeTypes, ElementTypes, AttributeNode, DirectiveNode, TextNode, InterpolationNode } from "@vue/compiler-core"

export const walk = (node: TemplateChildNode | RootNode, cb: (node: TemplateChildNode, parent: TemplateChildNode | RootNode) => void) => {
  if (!('children' in node)) {
    return
  }

  for (const child of node.children) {
    if (typeof child === 'string') {
      continue
    }
    if (typeof child === 'symbol') {
      continue
    }
    if (child.type === NodeTypes.SIMPLE_EXPRESSION) {
      continue
    }

    cb(child, node)
    if (node.children.includes(child as any)) {
      walk(child, cb)
    }
  }
}

/** @deprecated */
export const walkSlots = (node: RootNode, cb: (node: ElementNode, parent: TemplateChildNode | RootNode) => void) => {
  walk(node, (node, parent) => {
    if (node.type === NodeTypes.ELEMENT && node.tagType === ElementTypes.SLOT) {
      cb(node, parent)
    }
  })
}

/** @deprecated */
export const walkTags = (node: RootNode, cb: (node: ElementNode) => void) => {
  walk(node, (node) => {
    if (node.type === NodeTypes.ELEMENT && node.tagType === ElementTypes.COMPONENT) {
      cb(node)
    }
  })
}

/** @deprecated */
export const walkTemplateInterpolations = (node: RootNode, cb: (node: InterpolationNode) => void) => {
  walk(node, (node) => {
    if (node.type === NodeTypes.INTERPOLATION) {
      cb(node)
    }
  })
}

/** @deprecated */
export const walkCompiledVIf = (node: RootNode, cb: (node: ElementNode, parent: TemplateChildNode | RootNode) => void) => {
  walk(node, (node, parent) => {
    if (node.type === NodeTypes.ELEMENT && node.props.some((prop) => prop.name === '$v-if')) {
      cb(node, parent)
    }
  })
}

/** @deprecated */
export const walkPropBinds = (node: RootNode, cb: (prop: DirectiveNode, node: ElementNode, parent: ElementNode | RootNode) => void) => {
  walk(node, (node, parent) => {
    if (node.type === NodeTypes.ELEMENT) {
      node.props.forEach((prop) => {
        if (prop.type === NodeTypes.DIRECTIVE) {
          cb(prop, node, parent as ElementNode)
        }
      })
    }
  })
}
