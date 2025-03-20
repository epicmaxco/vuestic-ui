import { TemplateNode, ElementNode } from "@vue/compiler-core"
import { CompilerContext } from "../../create-compiler-context"
import { isPropAttribute } from "../ast-helpers"

function getNodeSlotName(node: ElementNode): string | undefined {
  const nameProp = node.props.find((prop) => prop.name === 'name')

  if (nameProp && isPropAttribute(nameProp)) {
    return nameProp.value?.content
  }

  return undefined
}

export const transformSlotNode = (node: ElementNode, parent: ElementNode, ctx: CompilerContext) => {
  const nodeIndex = parent.children.indexOf(node)

  const slotName = getNodeSlotName(node) || 'default'
  const slot = ctx.slots[slotName]

  if (!slot) {
    parent.children.splice(nodeIndex, 1)
    return
  }

  parent.children.splice(nodeIndex, 1, ...slot.children)
}
