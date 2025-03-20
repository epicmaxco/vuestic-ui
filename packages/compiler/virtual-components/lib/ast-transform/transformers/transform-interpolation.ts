import { InterpolationNode, NodeTypes } from "@vue/compiler-core"
import { CompilerContext } from "../../create-compiler-context"
import { printValueInTemplate } from "../../execute/print-rendering-context"
import { patchNode } from "../ast-helpers"

export const transformInterpolation = (node: InterpolationNode, ctx: CompilerContext) => {
  if (node.content.type !== NodeTypes.SIMPLE_EXPRESSION) {
    throw new Error('Only simple expressions are supported in text interpolations')
  }

  const result = ctx.execute(node.content.content)

  patchNode(node, {
    type: NodeTypes.TEXT,
    content: printValueInTemplate(result, 'Interpolation'),
    loc: node.loc
  })
}
