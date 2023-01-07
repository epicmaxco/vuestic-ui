import { Parser, Node } from 'acorn'
import { simple } from 'acorn-walk'
import { Property } from 'estree'

export type ParsedBlock = {
  code: string
  type: string
  args: string[],
  /**
   *  Replace block argument code at specific index to new string.
   * @notice if you add new args in new string they will not appear in args array.
  */
  replaceArgCode: (index: number, value: string) => string
}

type AcornNode<T> = Node & T

export const parseCode = (code: string) => {
  const parser = new Parser({ ecmaVersion: 2020, sourceType: 'module' }, code)

  const blocks: ParsedBlock[] = []

  simple(parser.parse(), {
    Property(node: AcornNode<Property>) {
      if (!('name' in node.key && node.key.name === 'blocks')) { return }

      if (!('elements' in node.value)) { return }

      node.value?.elements?.forEach((element) => {
        blocks.push({
          code: code.slice(element.start, element.end),
          type: element.callee?.property?.name,
          args: element.arguments?.map((arg: any) => code.slice(arg.start, arg.end)),
          replaceArgCode: (index: number, value: string) => {
            return code.slice(0, element.arguments[index].start) + value + code.slice(element.arguments[index].end)
          }
        })
      })
    }
  })

  return blocks
}
