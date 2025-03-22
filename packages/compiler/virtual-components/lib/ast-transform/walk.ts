import { TemplateChildNode, RootNode, ElementNode, NodeTypes, ElementTypes, AttributeNode, DirectiveNode, TextNode, InterpolationNode } from "@vue/compiler-core"
import { MemberExpression, ModuleDeclaration, Program, Statement, TemplateLiteral, Node } from "acorn"

export const walk = (node: TemplateChildNode | RootNode, cb: (node: TemplateChildNode, parent: TemplateChildNode | RootNode) => void) => {
  if (!('children' in node)) {
    return
  }

  const children = [...node.children]
  for (const child of children) {
    if (typeof child === 'string') {
      continue
    }
    if (typeof child === 'symbol') {
      continue
    }
    if (child.type === NodeTypes.SIMPLE_EXPRESSION) {
      continue
    }

    cb(child, node)

    if (node.children.includes(child as any)) {
      walk(child, cb)
    }
  }
}

export const walkTags = (node: RootNode, cb: (node: ElementNode) => void) => {
  walk(node, (node) => {
    if (node.type === NodeTypes.ELEMENT && node.tagType === ElementTypes.COMPONENT) {
      cb(node)
    }
  })
}

export const walkScriptAst = (node: Node | Statement | ModuleDeclaration | Program, cb: (node: Node) => void) => {
  cb(node)
  if ('body' in node && Array.isArray((node as Program).body)) {
    for (const child of (node as Program).body) {
      walkScriptAst(child, cb)
    }
  }
  if ('expression' in node && node.type === 'ExpressionStatement') {
    walkScriptAst(node.expression, cb)
  }
  if ('left' in node) {
    walkScriptAst(node.left, cb)
  }
  if ('right' in node) {
    walkScriptAst(node.right, cb)
  }
  if ('object' in node) {
    walkScriptAst(node.object, cb)
  }
  if (node.type === 'MemberExpression') {
    walkScriptAst((node as MemberExpression).property, cb)
  }
  if (node.type === 'TemplateLiteral' && 'expressions' in node) {
    for (const expression of (node as TemplateLiteral).expressions) {
      walkScriptAst(expression, cb)
    }
  }
}
