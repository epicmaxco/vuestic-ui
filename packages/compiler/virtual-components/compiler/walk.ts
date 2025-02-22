import { TemplateChildNode, RootNode, ElementNode, NodeTypes, ElementTypes, AttributeNode, DirectiveNode } from "@vue/compiler-core"

const walk = (node: TemplateChildNode | RootNode, cb: (node: TemplateChildNode, parent: TemplateChildNode | RootNode) => void) => {
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
    walk(child, cb)
  }
}

export const walkSlots = (node: RootNode, cb: (node: ElementNode, parent: TemplateChildNode | RootNode) => void) => {
  walk(node, (node, parent) => {
    if (node.type === NodeTypes.ELEMENT && node.tagType === ElementTypes.SLOT) {
      cb(node, parent)
    }
  })
}

export const walkTags = (node: RootNode, cb: (node: ElementNode) => void) => {
  walk(node, (node) => {
    if (node.type === NodeTypes.ELEMENT && node.tagType === ElementTypes.COMPONENT) {
      cb(node)
    }
  })
}

export const walkCompiledVIf = (node: RootNode, cb: (node: ElementNode, parent: TemplateChildNode | RootNode) => void) => {
  walk(node, (node, parent) => {
    if (node.type === NodeTypes.ELEMENT && node.props.some((prop) => prop.name === '$v-if')) {
      cb(node, parent)
    }
  })
}

export const walkPropBinds = (node: RootNode, cb: (node: DirectiveNode, parent: ElementNode) => void) => {
  walk(node, (node, parent) => {
    if (node.type === NodeTypes.ELEMENT) {
      node.props.forEach((prop) => {
        if (prop.type === NodeTypes.DIRECTIVE) {
          cb(prop, node)
        }
      })
    }
  })
}
