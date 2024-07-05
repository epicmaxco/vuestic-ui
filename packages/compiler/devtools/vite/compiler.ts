import { parse } from '@vue/compiler-sfc'
import type { TemplateChildNode, RootNode } from '@vue/compiler-core'
import MagicString from 'magic-string'
import { minifyPath } from '../shared/slug'
import { PREFIX } from '../shared/CONST'

const walk = (node: TemplateChildNode | RootNode, cb: (node: TemplateChildNode | RootNode) => void) => {
  cb(node)

  if (!('children' in node)) { return }

  for (const child of node.children) {
    if (typeof child === 'string') { continue }
    if (typeof child === 'symbol') { continue }
    if (child.type === 4) { continue }

    walk(child, cb)
  }
}

const getNodeLoc = (source: string) => {
  let selfCloseIndex = source.indexOf('/>')
  let closeIndex = source.indexOf('>')

  if (selfCloseIndex === -1) {
    selfCloseIndex = source.length
  }

  if (closeIndex === -1) {
    closeIndex = source.length
  }

  return {
    start: { offset: 0 },
    end: { offset: selfCloseIndex < closeIndex ? selfCloseIndex + 2 : closeIndex + 1 },
    source: source.slice(0, selfCloseIndex < closeIndex ? selfCloseIndex + 2 : closeIndex + 1),
    endSymbol: selfCloseIndex < closeIndex ? '/>' : '>',
  }
}


export const transformFile = async (code: string, id: string) => {
  const result = parse(code)
  const templateAst = result.descriptor.template?.ast

  if (!templateAst) {
    return
  }

  let source = new MagicString(code)
  let templateSource = new MagicString(templateAst.source)

  // TODO: TS fix correct versions of @vue/compiler-core and @vue/compiler-sfc
  walk(templateAst as unknown as RootNode, (node) => {
    if (node.type === 1) {
      const loc = getNodeLoc(node.loc.source)

      const nodeId = `${id}:${node.loc.start.offset}:${node.loc.end.offset}` as const

      const withAttribute = ` data-${PREFIX}="" data-${minifyPath(nodeId)}=""${loc.endSymbol}`

      const newNodeSource = node.loc.source
        .replace(loc.source, loc.source.slice(0, -1 * loc.endSymbol.length) + withAttribute)
        .slice(loc.start.offset, loc.end.offset - 1 + withAttribute.length)

      templateSource = templateSource.overwrite(node.loc.start.offset, node.loc.start.offset + loc.end.offset, newNodeSource)
    }
  })

  return {
    code: source.replace(templateAst.source, templateSource.toString()).toString(),
    map: source.generateMap(),
  }
}
