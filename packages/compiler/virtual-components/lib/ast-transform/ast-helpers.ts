import { AttributeNode, ComponentNode, DirectiveNode, ElementNode, ElementTypes, InterpolationNode, NodeTypes, RootNode, SlotOutletNode, TemplateChildNode, TemplateNode, Node } from "@vue/compiler-core"

export const isPropAttribute = (prop: any): prop is AttributeNode => {
  return prop.type === NodeTypes.ATTRIBUTE
}

export const isPropDirective = (prop: any): prop is DirectiveNode => {
  return prop.type === NodeTypes.DIRECTIVE
}

export const isNodeSlot = (node: TemplateChildNode): node is SlotOutletNode => {
  return node.type === NodeTypes.ELEMENT && node.tagType === ElementTypes.SLOT
}

/** If slot passed as template */
export const isNodeTemplateSlot = (node: TemplateChildNode): node is TemplateNode => {
  // TODO: Check if template have slot attribute
  return node.type === NodeTypes.ELEMENT && node.tagType === ElementTypes.TEMPLATE
}

export const isNodeElement = (node: TemplateChildNode | RootNode): node is ElementNode => {
  return node.type === NodeTypes.ELEMENT
}

export const isNodeHasChildren = (node: TemplateChildNode | RootNode): node is ElementNode | RootNode => {
  return 'children' in node
}

export const isNodeComponent = (node: TemplateChildNode): node is ComponentNode => {
  return node.type === NodeTypes.ELEMENT && node.tagType === ElementTypes.COMPONENT
}

export const isNodeInterpolation = (node: TemplateChildNode): node is InterpolationNode => {
  return node.type === NodeTypes.INTERPOLATION
}

export const isNodeWithIf = (node: TemplateChildNode): node is ElementNode => {
  return node.type === NodeTypes.ELEMENT && node.props.some((prop) => prop.name === 'v-if')
}

export const isNodeWithFor = (node: TemplateChildNode): node is ElementNode => {
  return node.type === NodeTypes.ELEMENT && node.props.some((prop) => prop.name === 'v-for')
}

export const patchNode = <T extends Node>(node: Node, newNode: T) => {
  const keys = Object.keys(node) as (keyof Node)[]
  for (const key of keys) {
    delete node[key]
  }

  Object.assign(node, newNode)

  return node
}
