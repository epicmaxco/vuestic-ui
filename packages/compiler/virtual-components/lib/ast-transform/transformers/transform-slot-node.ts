import { CompilerNodeContext } from './../../create-compilation-context/create-node-context';
import { TemplateNode, ElementNode } from "@vue/compiler-core"
import { isPropAttribute } from "../ast-helpers"

function getNodeSlotName(node: ElementNode): string | undefined {
  const nameProp = node.props.find((prop) => prop.name === 'name')

  if (nameProp && isPropAttribute(nameProp)) {
    return nameProp.value?.content
  }

  return undefined
}

export const transformSlotNode = (node: ElementNode, parent: ElementNode, ctx: CompilerNodeContext) => {
  const nodeIndex = parent.children.indexOf(node)

  const slotName = getNodeSlotName(node) || 'default'
  const slot = ctx.slots[slotName]

  if (!slot) {
    parent.children.splice(nodeIndex, 1)
    return
  }

  parent.children.splice(nodeIndex, 1, ...slot.children)
}
