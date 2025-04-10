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
    return
  }

  if ('expressions' in node) {
    for (const expression of node.expressions) {
      onAccess(expression, codeString, cb, node)
    }
    return
  }

  if ('expression' in node) {
    return onAccess(node.expression, codeString, cb, node)
  }

  if ('left' in node) {
    return onAccess(node.left, codeString, cb, node)
  }

  if ('right' in node) {
    return onAccess(node.right, codeString, cb, node)
  }

  if ('object' in node) {
    return onAccess(node.object, codeString, cb, node)
  }

  if ('elements' in node) {
    for (const element of node.elements) {
      onAccess(element, codeString, cb, node)
    }
    return
  }

  if ('argument' in node) {
    return onAccess(node.argument, codeString, cb, node)
  }

  throw new Error(`Unexpected: Unable to parse node ${node.type}`)
}
