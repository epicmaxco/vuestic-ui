import { MagicString } from "@vue/compiler-sfc"
import { VirtualComponentError } from "../errors"

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

  if ('left' in node || 'right' in node) {
    if ('left' in node) {
      onAccess(node.left, codeString, cb, node)
    }

    if ('right' in node) {
      onAccess(node.right, codeString, cb, node)
    }

    return
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

  if (node.type === 'Literal') {
    // Do nothing for literals
    return
  }

  if (node.type === 'ObjectExpression') {
    for (const prop of node.properties) {
      if (prop.type === 'Property') {
        onAccess(prop.value, codeString, cb, node)
      } else if (prop.type === 'SpreadElement') {
        onAccess(prop.argument, codeString, cb, node)
      }
    }
    return
  }

  throw new VirtualComponentError(`Unexpected: Unable to parse node ${node.type}`)
}
