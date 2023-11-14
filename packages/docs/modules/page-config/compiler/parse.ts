import { Parser, Node } from 'acorn'
import { simple } from 'acorn-walk'
import { CallExpression } from 'estree'

export type ParsedBlock = {
  code: string
  type: string
  args: string[],
  /**
   *  Replace block argument code at specific index to new string.
   * @notice if you add new args in new string they will not appear in args array.
  */
  replaceArgCode: (index: number, value: string) => string

  argNodes: Node[]
}

type AcornNode<T = {}> = Node & T

export const parseCode = (code: string) => {
  try {
    const parser = new Parser({ ecmaVersion: 2020, sourceType: 'module' }, code)

    const blocks: ParsedBlock[] = []

    simple(parser.parse(), {
      CallExpression(node: AcornNode) {
        if (node.type !== 'CallExpression') { return }
        const n = node as unknown as CallExpression

        if (n.callee.type !== 'MemberExpression') { return }

        if (n.callee.object.type !== 'Identifier') { return }
        if (n.callee.property.type !== 'Identifier') { return }

        if (n.callee.object.name !== 'block') { return }

        const blockName = n.callee.property.name

        const args = n.arguments.map((arg: any) => code.slice(arg.start, arg.end))

        const blockCode = code.slice(node.start, node.end)

        blocks.push({
          code: blockCode,
          type: blockName,
          args,
          argNodes: n.arguments as unknown as Node[],
          replaceArgCode: (index: number, value: string) => {
            // In case there is not arguments at this index, add to the end
            if (n.arguments.length == 0) {
              code = code.replace(blockCode, blockCode.replace(')', `${value})`))
              return code
            }
            if (index > n.arguments.length - 1) {
              code = code.replace(blockCode, blockCode.replace(')', `, ${value})`))
              return code
            }

            const argStartInSlice = (n.arguments[index] as any).start - node.start
            const argEndInSlice = (n.arguments[index] as any).end - node.start

            const newBlockCode = blockCode.slice(0, argStartInSlice) + value + blockCode.slice(argEndInSlice)
            const newCode = code.replace(blockCode, newBlockCode)
            code = newCode
            return newCode
          }
        })
      }
    })

    return blocks
  } catch (e) {
    console.error(code)
    throw e
  }
}
