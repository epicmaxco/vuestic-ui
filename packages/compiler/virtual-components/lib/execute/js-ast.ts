import { MagicString } from "@vue/compiler-sfc"

export const onAccess = (node: any, codeString: MagicString, cb: (node: any, parent?: any) => void, parent: any = null): void => {
  if (node.type === 'PropertyAccessExpression') {
    return cb(node, parent)
  }
  if (node.type === 'Identifier') {
    return cb(node, parent)
  }

  if (node.type === 'CallExpression') {
    node.arguments.forEach((arg: any) => {
      onAccess(arg, codeString, cb, node)
    })
    return onAccess(node.callee, codeString, cb, node)
  }

  if ('children' in node) {
    for (const child of node.children) {
      onAccess(child, codeString, cb, node)
    }
  }

  if ('expressions' in node) {
    for (const expression of node.expressions) {
      onAccess(expression, codeString, cb, node)
    }
  }

  if ('expression' in node) {
    onAccess(node.expression, codeString, cb, node)
  }

  if ('left' in node) {
    onAccess(node.left, codeString, cb, node)
  }

  if ('right' in node) {
    onAccess(node.right, codeString, cb, node)
  }

  if ('object' in node) {
    onAccess(node.object, codeString, cb, node)
  }

  if ('elements' in node) {
    for (const element of node.elements) {
      onAccess(element, codeString, cb, node)
    }
  }

  // console.log(node)
}
