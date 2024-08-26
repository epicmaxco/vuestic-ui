import { parse } from '@vue/compiler-sfc'
import type { TemplateChildNode, RootNode } from '@vue/compiler-core'
import MagicString from 'magic-string'
import { minifyPath } from '../shared/slug'
import { PREFIX } from '../shared/CONST'
import { stringifyFileQuery } from '../shared/file-query'

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

const findEndTagIndex = (source: string) => {
  let inQuotes = false

  for (let i = 0; i < source.length; i++) {
    if (source[i] === '"') {
      inQuotes = !inQuotes
    }

    if (source[i] === '>' && !inQuotes) {
      return i
    }
  }

  return -1
}

const findSefCloseTagIndex = (source: string) => {
  let inQuotes = false

  for (let i = 0; i < source.length; i++) {
    if (source[i] === '"') {
      inQuotes = !inQuotes
    }

    if (source[i] === '/' && source[i + 1] === '>' && !inQuotes) {
      return i
    }
  }

  return -1
}

const getNodeTagLoc = (source: string) => {
  let selfCloseIndex = findSefCloseTagIndex(source)
  let closeIndex = findEndTagIndex(source)

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
  // TODO: remove old minified paths
  const result = parse(code)
  const templateAst = result.descriptor.template?.ast

  if (!templateAst) {
    return
  }

  let source = new MagicString(code)

  // TODO: TS fix correct versions of @vue/compiler-core and @vue/compiler-sfc
  walk(templateAst as unknown as RootNode, (node) => {
    if (node.type === 1) {
      const tagLoc = getNodeTagLoc(node.loc.source)
      const nodeId = stringifyFileQuery(id, node.loc.start.offset, node.loc.end.offset)

      const withAttribute = ` data-${PREFIX}="" data-${minifyPath(nodeId)}="${node.tag}"`

      source.appendLeft(node.loc.start.offset + tagLoc.end.offset - tagLoc.endSymbol.length, withAttribute)
    }
  })

  return {
    code: source.toString(),
    map: source.generateMap(),
  }
}
