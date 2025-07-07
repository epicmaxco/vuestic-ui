import { ElementNode } from "@vue/compiler-core"

export const getNodeIndent = (node: ElementNode, source: string) => {
  let indent = 0

  for (let i = node.loc.start.offset - 1; i >= 0; i--) {
    if (source[i] === '\n') {
      break
    }

    indent++
  }

  return indent
}

export const addIndent = (source: string, indent: number) => {
  return source.replace(/\n/g, `\n${' '.repeat(indent)}`)
}
