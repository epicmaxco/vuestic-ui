import { AttributeNode, DirectiveNode, ElementTypes, NodeTypes, TemplateChildNode, TemplateNode } from "@vue/compiler-core"

export const isPropAttribute = (prop: any): prop is AttributeNode => {
  return prop.type === NodeTypes.ATTRIBUTE
}

export const isPropDirective = (prop: any): prop is DirectiveNode => {
  return prop.type === NodeTypes.DIRECTIVE
}

export const isNodeTemplateSlot = (node: TemplateChildNode): node is TemplateNode => {
  return node.type === NodeTypes.ELEMENT && node.tagType === ElementTypes.TEMPLATE
}

export const toCamelCase = (str: string) => {
  return str.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase())
}
