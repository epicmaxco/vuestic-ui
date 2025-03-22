import { compileScript, MagicString, SFCDescriptor } from '@vue/compiler-sfc'
import { Node, Statement, ModuleDeclaration, MemberExpression, TemplateLiteral, Program, VariableDeclaration, FunctionDeclaration, Identifier } from 'acorn'
import { transpileTs } from '../execute/transpile-ts'
import { VirtualComponentError } from '../errors'

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

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const prefixFunctionName = (name: string, prefix: string) => {
  return prefix + capitalize(name)
}

export const createScriptSetupMeta = (scriptSetup: SFCDescriptor, componentName: string) => {
  if (!scriptSetup.scriptSetup) {
    return {
      functions: [],
      variables: {},
    }
  }

  const script = compileScript(scriptSetup, { id: 'test' })

  if (!script.scriptSetupAst) {
    return {
      functions: [],
      variables: {},
    }
  }

  const source = scriptSetup.scriptSetup?.content ?? ''

  const variables = {} as Record<string, string>

  const functions = [] as {
    name: string,
    originalName: string,
    source: string,
    originalSource: string
  }[]

  const fnPrefix = 'vc' + componentName

  const addFn = (id: Identifier, node: Node) => {
    const originalName = id.name
    const name = prefixFunctionName(originalName, fnPrefix)

    const ms = new MagicString(source)
    ms.overwrite(id.start, id.end, name)

    functions.push({
      name,
      originalName,
      source: transpileTs(ms.slice(node.start, node.end)).outputText,
      originalSource: source.slice(node.start, node.end)
    })
  }

  script.scriptSetupAst.forEach((node) => {
    walk(node as any, (node) => {
      if (node.type === 'FunctionDeclaration') {
        const id = (node as FunctionDeclaration).id
        const name = id.name

        addFn(id, node)
      }
      if (node.type === 'VariableDeclaration') {
        const dec = node as VariableDeclaration
        if (dec.declarations.length > 1) {
          throw new VirtualComponentError('Only one variable declaration is supported in virtual components')
        }

        if (dec.declarations[0].init?.type === 'ArrowFunctionExpression') {
          if (dec.declarations[0].id.type !== 'Identifier') {
            throw new VirtualComponentError('Only identifier declarations are supported. No destructuring in virtual components')
          }

          const id = dec.declarations[0].id

          addFn(id, node)
        } else if (node) {
          if (dec.declarations[0].id.type !== 'Identifier') {
            // pass
          } else {
            const name = dec.declarations[0].id.name
            const init = dec.declarations[0].init
            if (!init) {
              return
            }
            const value = source.slice(init.start, init.end)
            variables[name] = String(value)
          }
        }
      }
    })
  })

  return {
    functions,
    variables,
  }
}
