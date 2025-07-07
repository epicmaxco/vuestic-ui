import { Node } from '@vue/compiler-core'

type VisitedNode = Node & { __virtualComponentTransformed: true }

export const markNodeAstVisited = (node: Node): VisitedNode => {
  (node as any).__virtualComponentTransformed = true
  return node as VisitedNode
}

export const isNodeAstVisited = (node: Node): node is VisitedNode => {
  return !!(node as any).__virtualComponentTransformed
}
