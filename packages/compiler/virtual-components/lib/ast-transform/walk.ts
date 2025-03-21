import { TemplateChildNode, RootNode, ElementNode, NodeTypes, ElementTypes, AttributeNode, DirectiveNode, TextNode, InterpolationNode } from "@vue/compiler-core"

export const walk = (node: TemplateChildNode | RootNode, cb: (node: TemplateChildNode, parent: TemplateChildNode | RootNode) => void) => {
  if (!('children' in node)) {
    return
  }

  const children = [...node.children]
  for (const child of children) {
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

export const walkTags = (node: RootNode, cb: (node: ElementNode) => void) => {
  walk(node, (node) => {
    if (node.type === NodeTypes.ELEMENT && node.tagType === ElementTypes.COMPONENT) {
      cb(node)
    }
  })
}

