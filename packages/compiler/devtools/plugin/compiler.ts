import { parse } from '@vue/compiler-sfc'
import type { TemplateChildNode, RootNode } from '@vue/compiler-core'
import MagicString from 'magic-string'
import { minifyPath } from '../shared/slug'
import { PREFIX } from '../shared/CONST'
import { stringifyFileQuery } from '../shared/file-query'
import { readFile } from 'node:fs/promises'
import { makeDiffSyncByRow } from './diff-sync'

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

export const fromOutputToSourceShift = (source: string, output: string) => {
  const diff = makeDiffSyncByRow(source, output)


  return (start: number, end: number) => {
    let current: typeof diff[number] | undefined = undefined
    let shiftStart = 0
    let shiftEnd = 0

    for (let i = 0; i < diff.length; i++) {
      current = diff[i]

      if (current.end.output > end) {
        break
      }

      if (current.type === 'equal') {
        continue
      } else if (current.type === 'insert') {
        if (current.start.output < start) {
          shiftStart -= current.source.length
        }
        if (current.end.output < end) {
          shiftEnd -= current.source.length
        }
      }
    }

    if (!current) {
      return { start: 0, end: 0 }
    }

    return { start: shiftStart, end: shiftEnd }
  }
}


export const transformFile = async (code: string, id: string) => {
  // Read the source file, ignore polluted code from other plugins
  const sourceFile = await readFile(id, 'utf-8')
  // TODO: remove old minified paths
  const result = parse(code)
  const templateAst = result.descriptor.template?.ast

  if (!templateAst) {
    return
  }

  let source = new MagicString(code)

  // Handle other plugins that may have modified the code
  if (code !== sourceFile) {
    const getShift = fromOutputToSourceShift(sourceFile, code)

    // TODO: TS fix correct versions of @vue/compiler-core and @vue/compiler-sfc
    walk(templateAst as unknown as RootNode, (node) => {
      if (node.type === 1) {
        const tagLoc = getNodeTagLoc(node.loc.source)
        const shift = getShift(node.loc.start.offset, node.loc.end.offset)
        const nodeId = stringifyFileQuery(id, node.loc.start.offset + shift.start, node.loc.end.offset + shift.end)

        const withAttribute = ` data-${PREFIX}="" data-${minifyPath(nodeId)}="${node.tag}"`

        source.appendLeft(node.loc.start.offset + tagLoc.end.offset - tagLoc.endSymbol.length, withAttribute)
      }
    })
  } else {
     // TODO: TS fix correct versions of @vue/compiler-core and @vue/compiler-sfc
    walk(templateAst as unknown as RootNode, (node) => {
      if (node.type === 1) {
        const tagLoc = getNodeTagLoc(node.loc.source)
        const nodeId = stringifyFileQuery(id, node.loc.start.offset, node.loc.end.offset)

        const withAttribute = ` data-${PREFIX}="" data-${minifyPath(nodeId)}="${node.tag}"`

        source.appendLeft(node.loc.start.offset + tagLoc.end.offset - tagLoc.endSymbol.length, withAttribute)
      }
    })
  }



  return {
    code: source.toString(),
    map: source.generateMap(),
  }
}
