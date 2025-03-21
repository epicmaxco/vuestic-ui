import { compileScript, SFCDescriptor } from '@vue/compiler-sfc'
import { Node, Statement, ModuleDeclaration, MemberExpression, TemplateLiteral, Program, VariableDeclaration, FunctionDeclaration } from 'acorn'
import ts from 'typescript'

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

const transpileTs = (code: string) => {
  return ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ESNext,
      strict: false,
    },
  })
}

export const createScriptSetupContext = (scriptSetup: SFCDescriptor) => {
  if (!scriptSetup.scriptSetup) {
    return {
      functions: [],
      variables: [],
      functionNames: [],
    }
  }

  const script = compileScript(scriptSetup, { id: 'test' })

  // console.log(script)

  if (!script.scriptSetupAst) {
    return {
      functions: [],
      variables: [],
      functionNames: [],
    }
  }

  const source = scriptSetup.scriptSetup?.content ?? ''

  const functions = [] as string[]
  const functionNames = [] as string[]
  const variables = [] as string[]

  script.scriptSetupAst.forEach((node) => {
    walk(node as any, (node) => {
      if (node.type === 'FunctionDeclaration') {
        const name = (node as FunctionDeclaration).id.name
        functionNames.push(name)
        functions.push(source.slice(node.start, node.end))
      }
      if (node.type === 'VariableDeclaration') {
        const dec = node as VariableDeclaration
        if (dec.declarations.length > 1) {
          throw new Error('Only one variable declaration is supported')
        }

        if (dec.declarations[0].init?.type === 'ArrowFunctionExpression') {
          if (dec.declarations[0].id.type !== 'Identifier') {
            throw new Error('Only identifier declarations are supported. No destructuring.')
          }

          functions.push(source.slice(node.start, node.end))
          functionNames.push(dec.declarations[0].id.name)
        } else if (node) {
          variables.push(source.slice(node.start, node.end))
        }
      }
    })
  })

  functions.forEach((fn, i) => {
    functions[i] = transpileTs(fn).outputText
  })

  return {
    functions,
    functionNames,
    variables,
  }
}
