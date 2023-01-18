

import { Parser, Node } from 'acorn'
import { simple } from 'acorn-walk'

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

type AcornNode<T> = Node & T

export const parseCode = (code: string) => {
  const parser = new Parser({ ecmaVersion: 2020, sourceType: 'module' }, code)

  const blocks: ParsedBlock[] = []

  simple(parser.parse(), {
    Property(node: AcornNode<any>) {
      if (!('name' in node.key && node.key.name === 'blocks')) { return }

      if (!('elements' in node.value)) { return }

      node.value?.elements?.forEach((element: any) => {
        // TODO: This is not ideal, we should use acorn-walk to find the code always
        const blockCode = code.slice(element.start, element.end)

        blocks.push({
          code: blockCode,
          type: element.callee?.property?.name,
          args: element.arguments?.map((arg: any) => code.slice(arg.start, arg.end)),
          argNodes: element.arguments,
          replaceArgCode: (index: number, value: string) => {
            const argStartInSlice = element.arguments[index].start - element.start
            const argEndInSlice = element.arguments[index].end - element.start

            const newBlockCode = blockCode.slice(0, argStartInSlice) + value + blockCode.slice(argEndInSlice)
            const newCode = code.replace(blockCode, newBlockCode)
            code = newCode
            return newCode
          }
        })
      })
    }
  })

  return blocks
}
