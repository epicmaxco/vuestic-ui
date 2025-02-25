import { ElementNode, NodeTypes, ElementTypes, ConstantTypes, AttributeNode, TemplateChildNode, TemplateNode, DirectiveNode } from "@vue/compiler-core"

const findSlotName = (child: ElementNode) => {
  for (const prop of child.props) {
    if (prop.type === NodeTypes.DIRECTIVE) {
      if (prop.arg?.type === NodeTypes.SIMPLE_EXPRESSION) {
        return prop.arg.content
      }
    }
  }

  return null
}

const isPropAttribute = (prop: any): prop is AttributeNode => {
  return prop.type === NodeTypes.ATTRIBUTE
}

const isPropDirective = (prop: any): prop is DirectiveNode => {
  return prop.type === NodeTypes.DIRECTIVE
}

const isNodeTemplateSlot = (node: TemplateChildNode): node is TemplateNode => {
  return node.type === NodeTypes.ELEMENT && node.tagType === ElementTypes.TEMPLATE
}

const toCamelCase = (str: string) => {
  return str.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase())
}

export const createCompilerContext = (node: ElementNode, source: string) => {
  const tag = node.tag

  const rawProps = node.props
    .filter(isPropAttribute)
    .map((prop) => {
      return {
        value: prop.value?.content,
        name: toCamelCase(prop.name),
        rawName: prop.name
      }
    })

  const props = rawProps
    .reduce((acc, prop) => {
      acc[prop.name] = prop.value ?? true
      return acc
    }, {} as Record<string, string | boolean>)

  const directives = node.props
    .filter(isPropDirective)

  const templateSlots = node.children
    .filter((child) => isNodeTemplateSlot(child))

  const defaultSlotNodes = node.children
    .filter((child) => !isNodeTemplateSlot(child))

  const slots = {} as Record<string, CompilerComponentSlot>
  templateSlots.forEach((child) => {
    const name = findSlotName(child)
    if (!name) {
      throw new Error('Slot name is required')
    }
    slots[name] = {
      name, children: child.children
    }
  })

  if (defaultSlotNodes.length) {
    slots['default'] = ({
      name: 'default',
      children: defaultSlotNodes
    })
  }

  return {
    name: tag.replace(/^Vc/g, ''), // TODO: maybe handle custom prefix
    tag,
    props,
    rawProps,
    slots,
    directives,
    originalSource: node.loc.source,
    source: source.trim(),
  } as CompilerComponent
}

type CompilerComponentSlot = {
  name: string,
  children: ElementNode['children']
}

export type CompilerComponent = {
  name: string,
  tag: string,
  rawProps: { value: string | null, name: string, rawName: string }[],
  props: Record<string, string | boolean>,
  slots: Record<string, CompilerComponentSlot>,
  directives: DirectiveNode[],
  source: string,
  originalSource: string
}
