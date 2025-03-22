import { ElementNode, NodeTypes, TemplateChildNode } from "@vue/compiler-core"
import { isNodeTemplateSlot } from "../../utils"

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

export const createNodeContextSlots = (node: ElementNode) => {
  const directives = node.props.filter((prop) => prop.type === NodeTypes.DIRECTIVE)

  const templateSlots = node.children
    .filter(isNodeTemplateSlot)

  const defaultSlotNodes = node.children
    .filter((child) => !isNodeTemplateSlot(child))

  const slots = {} as Record<string, { name: string, children: TemplateChildNode[] }>
  templateSlots.forEach((child) => {
    const slotName = findSlotName(child)

    if (!slotName) {
      return
    }

    slots[slotName] = {
      name: slotName,
      children: child.children
    }
  })

  if (defaultSlotNodes.length) {
    const slotDirective = directives.find((dir) => dir.name === 'slot')

    if (slotDirective && slotDirective.arg) {
      const slotName = 'content' in slotDirective.arg ? slotDirective.arg.content : 'default'

      directives.splice(directives.indexOf(slotDirective), 1)

      slots[slotName] = {
        name: slotName,
        children: defaultSlotNodes
      }
    } else {
      slots.default = {
        name: 'default',
        children: defaultSlotNodes
      }
    }
  }

  return slots
}
