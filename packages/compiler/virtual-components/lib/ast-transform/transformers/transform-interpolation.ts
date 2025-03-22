import { InterpolationNode, NodeTypes } from "@vue/compiler-core"
import { patchNode } from "../ast-helpers"
import { VirtualComponentError } from "../../errors"
import { CompilerNodeContext } from "../../create-compilation-context/create-node-context"

export const transformInterpolation = (node: InterpolationNode, ctx: CompilerNodeContext) => {
  if (node.content.type !== NodeTypes.SIMPLE_EXPRESSION) {
    throw new VirtualComponentError('Unexpected Error: Only simple expressions are supported in text interpolations')
  }

  const result = ctx.execute(node.content.content)

  patchNode(node, {
    type: NodeTypes.TEXT,
    content: ctx.execute.printInTemplate(result, 'Interpolation'),
    loc: node.loc
  })
}
