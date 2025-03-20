import { parse, Node, Statement, ModuleDeclaration, MemberExpression, TemplateLiteral, Program, VariableDeclaration } from 'acorn'

export type ScriptSetupContext = {

} & Record<string, any>

const walk = (node: Node | Statement | ModuleDeclaration | Program, cb: (node: Node) => void) => {
  cb(node)
  if ('body' in node && Array.isArray((node as Program).body)) {
    for (const child of (node as Program).body) {
      walk(child, cb)
    }
  }
  if ('expression' in node && node.type === 'ExpressionStatement') {
    walk(node.expression, cb)
  }
  if ('left' in node) {
    walk(node.left, cb)
  }
  if ('right' in node) {
    walk(node.right, cb)
  }
  if ('object' in node) {
    walk(node.object, cb)
  }
  if (node.type === 'MemberExpression') {
    walk((node as MemberExpression).property, cb)
  }
  if (node.type === 'TemplateLiteral' && 'expressions' in node) {
    for (const expression of (node as TemplateLiteral).expressions) {
      walk(expression, cb)
    }
  }
}

export const createScriptSetupContext = (scriptSetup: string) => {
  const result = parse(scriptSetup, { ecmaVersion: 2020, sourceType: 'module' })

  const functions = [] as string[]
  const variables = [] as string[]

  walk(result, (node) => {
    if (node.type === 'FunctionDeclaration') {
      functions.push(scriptSetup.slice(node.start, node.end))
    }
    if (node.type === 'VariableDeclaration') {
      if ((node as VariableDeclaration).declarations[0].init?.type === 'ArrowFunctionExpression') {
        functions.push(scriptSetup.slice(node.start, node.end))
      } else if (node) {
        variables.push(scriptSetup.slice(node.start, node.end))
      }
    }
  })

  return {
    functions,
    variables,
  }
}
