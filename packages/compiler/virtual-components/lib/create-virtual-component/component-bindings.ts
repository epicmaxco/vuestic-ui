import { Node, Program } from "acorn"

enum VirtualComponentBindingRenderType {
  Static = 0,
  Dynamic = 1,
}

enum VirtualComponentBindingSourceType {
  // Static
  Const = 0,
  Function = 1,

  // Maybe dynamic
  Method = 2,
  Prop = 3,
  FromComposable = 4
}

const getNodeChildren = (node: Node) => {
  if ('body' in node && Array.isArray((node as Program).body)) {
    return (node as Program).body
  }

  // console.log(node)
}

const scriptAstHorizontalWalk = (node: Node, onNode: (node: Node) => void) => {
  onNode(node)

  const children = getNodeChildren(node)

  if (children) {
    for (const child of children) {
      onNode(child)
    }

    for (const child of children) {
      scriptAstHorizontalWalk(child, onNode)
    }
  }
}

export const getComponentBindings = (script: string) => {

}
